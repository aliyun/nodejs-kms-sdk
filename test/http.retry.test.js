'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');
const https = require('https');
const expect = require('expect.js');
const qs = require('querystring');
const KmsClient = require('../lib/');

const router = {
  'GET::DescribeRegions': JSON.stringify({ Regions: { Region: ['r1', 'r2'] } }),
  'GET::CreateKey': JSON.stringify({ KeyMetadata: { KeyId: 'test', KeyState: 'Enabled' } }),
  'GET::ListKeys': JSON.stringify({ Keys: { Key: ['k1', 'k2'] } }),
  'GET::DescribeKey': JSON.stringify({ KeyMetadata: { KeyId: 'test', KeyState: 'Enabled' } }),
  'GET::Encrypt': JSON.stringify({ CiphertextBlob: 'abc' }),
  'GET::Decrypt': JSON.stringify({ Plaintext: 'hello kms sdk for node.js' }),
  'GET::DisableKey': JSON.stringify({ RequestId: 'test' }),
  'GET::EnableKey': JSON.stringify({ RequestId: 'test' }),
  'GET::GenerateDataKey': JSON.stringify({ Plaintext: 'test', CiphertextBlob: 'test' }),
  'GET::GetParametersForImport': JSON.stringify({ ImportToken: 'test', PublicKey: 'test' }),
  'GET::ImportKeyMaterial': JSON.stringify({ RequestId: 'test' }),
  'GET::DeleteKeyMaterial': JSON.stringify({ RequestId: 'test' }),
  'GET::ScheduleKeyDeletion': JSON.stringify({ RequestId: 'test' }),
  'GET::CancelKeyDeletion': JSON.stringify({ RequestId: 'test' }),
  'GET::CreateAlias': JSON.stringify({ RequestId: 'test' }),
  'GET::UpdateAlias': JSON.stringify({ RequestId: 'test' }),
  'GET::ListAliases': JSON.stringify({ Aliases: { Alias: ['a1', 'a2'] }, TotalCount: 2 }),
  'GET::ListAliasesByKeyId': JSON.stringify({ Aliases: { Alias: ['a1'] }, TotalCount: 1 }),
  'GET::DeleteAlias': JSON.stringify({ RequestId: 'test' })
};

async function createServer(retry) {
  let httpsServer;
  let cache = {};

  const options = {
    key: fs.readFileSync(path.join(__dirname, './keys/server-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './keys/server-cert.pem'))
  };
  await new Promise(function (resolve, reject) {
    httpsServer = https.createServer(options, (req, res) => {
      const parse = url.parse(req.url);
      const action = qs.parse(parse.query).Action;
      const key = `${req.method}::${action}`;
      if (cache[key] && cache[key] % retry === 0) {
        res.writeHead(200);
        res.end(router[key]);
        cache[key] = null;
      } else {
        cache[key] ? (cache[key]++) : (cache[key] = 1);
        res.writeHead(500);
        res.end('failed');
      }
    });
    httpsServer.listen(8443, resolve);
  });

  return httpsServer;
}

describe('http retry should success', function () {
  const client = new KmsClient({
    endpoint: 'localhost:8443',
    accessKeyId: 'access_key',
    accessKeySecret: 'secret_key'
  });
  const runtimeOption = { backoff_policy: 'fixed', backoff_period: 10, ignoreSSL: false };
  const authOption = { ignoreSSL: false };
  const retry = 2;
  const keyId = 'test';
  const alias = 'test';

  let httpsServer;

  before(async function () {
    httpsServer = await createServer(retry);
  });

  after(function () {
    httpsServer && httpsServer.close();
  });

  it(`describe regions after retry ${retry}times`, async function () {
    // with no backoff_period
    let res = await client.describeRegions(authOption);
    expect(Array.isArray(res.Regions.Region)).to.be.ok();
    // with backoff_period
    res = await client.describeRegions(runtimeOption);
    expect(Array.isArray(res.Regions.Region)).to.be.ok();
  });

  it(`create key after retry ${retry}times`, async function () {
    // with no backoff_period
    let res = await client.createKey('Aliyun_KMS', `unit test create key ${new Date().toLocaleString()}`, 'ENCRYPT/DECRYPT', authOption);
    let keyMetadata = res.KeyMetadata;
    expect(keyMetadata && typeof keyMetadata === 'object').to.be.ok();
    expect(keyMetadata.KeyState).to.be('Enabled');
    let id = keyMetadata.KeyId;
    expect(id && typeof id === 'string').to.be.ok();
    // with backoff_period
    res = await client.createKey('Aliyun_KMS', `unit test create key ${new Date().toLocaleString()}`, 'ENCRYPT/DECRYPT', runtimeOption);
    keyMetadata = res.KeyMetadata;
    expect(keyMetadata && typeof keyMetadata === 'object').to.be.ok();
    expect(keyMetadata.KeyState).to.be('Enabled');
    id = keyMetadata.KeyId;
    expect(id && typeof id === 'string').to.be.ok();
  });

  it(`list keys after retry ${retry}times`, async function () {
    // with no backoff_period
    let res = await client.listKeys(1, 100, authOption);
    expect(Array.isArray(res.Keys.Key)).to.be.ok();
    // with backoff_period
    res = await client.listKeys(1, 100, runtimeOption);
    expect(Array.isArray(res.Keys.Key)).to.be.ok();
  });

  it(`describe key after retry ${retry}times`, async function () {
    // with no backoff_period
    let res = await client.describeKey(keyId, authOption);
    let keyMetadata = res.KeyMetadata;
    expect(keyMetadata && typeof keyMetadata === 'object').to.be.ok();
    expect(keyMetadata.KeyState).to.be('Enabled');
    // with backoff_period
    res = await client.describeKey(keyId, runtimeOption);
    keyMetadata = res.KeyMetadata;
    expect(keyMetadata && typeof keyMetadata === 'object').to.be.ok();
    expect(keyMetadata.KeyState).to.be('Enabled');
  });

  it(`encrypt & decrypt data after retry ${retry}times`, async function () {
    // encrypt
    // with no backoff_period
    const plaintext = 'hello kms sdk for node.js';
    let res = await client.encrypt(keyId, plaintext.toString('base64'), JSON.stringify({ k: 'v' }), authOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    let blob = res.CiphertextBlob;
    expect(typeof blob).to.be('string');
    // with backoff_period
    res = await client.encrypt(keyId, plaintext.toString('base64'), JSON.stringify({ k: 'v' }), runtimeOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    blob = res.CiphertextBlob;
    expect(typeof blob).to.be('string');

    // decrypt
    // with no backoff_period
    let res1 = await client.decrypt(blob, JSON.stringify({ k: 'v' }), authOption);
    expect(res1 && typeof res1 === 'object').to.be.ok();
    expect(res1.HttpStatus !== 400).to.be.ok();
    expect(res1.Plaintext).to.be(plaintext);
    // with backoff_period
    res1 = await client.decrypt(blob, JSON.stringify({ k: 'v' }), runtimeOption);
    expect(res1 && typeof res1 === 'object').to.be.ok();
    expect(res1.HttpStatus !== 400).to.be.ok();
    expect(res1.Plaintext).to.be(plaintext);
  });

  it(`disable & enable key after retry ${retry}times`, async function () {
    // disable key
    // with no backoff_period
    let res = await client.disableKey(keyId, authOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();
    // with backoff_period
    res = await client.disableKey(keyId, runtimeOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();

    // enable key
    let res1 = await client.enableKey(keyId, authOption);
    expect(res1 && typeof res1 === 'object').to.be.ok();
    expect(res1.HttpStatus !== 400).to.be.ok();
    expect(res1.RequestId && typeof res1.RequestId === 'string').to.be.ok();
    // with backoff_period
    res1 = await client.enableKey(keyId, runtimeOption);
    expect(res1 && typeof res1 === 'object').to.be.ok();
    expect(res1.HttpStatus !== 400).to.be.ok();
    expect(res1.RequestId && typeof res1.RequestId === 'string').to.be.ok();
  });

  it(`generate local data key after retry ${retry}times`, async function () {
    // with no backoff_period
    let res = await client.generateDataKey(keyId, 'AES_256', 128, '{"k":"v"}', authOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(typeof res.Plaintext === 'string').to.be.ok();
    expect(typeof res.CiphertextBlob === 'string').to.be.ok();
    // with backoff_period
    res = await client.generateDataKey(keyId, 'AES_256', 128, '{"k":"v"}', runtimeOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(typeof res.Plaintext === 'string').to.be.ok();
    expect(typeof res.CiphertextBlob === 'string').to.be.ok();
  });

  it(`import external key material after retry ${retry}times`, async function () {
    // get params for import
    // with no backoff_period
    let res1 = await client.getParametersForImport(keyId, 'RSAES_OAEP_SHA_256', 'RSA_2048', authOption);
    let importTokean = res1.ImportToken;
    let publicKey = res1.PublicKey;
    expect(importTokean && typeof importTokean === 'string').to.be.ok();
    expect(publicKey && typeof publicKey === 'string').to.be.ok();
    // with backoff_period
    res1 = await client.getParametersForImport(keyId, 'RSAES_OAEP_SHA_256', 'RSA_2048', runtimeOption);
    importTokean = res1.ImportToken;
    publicKey = res1.PublicKey;
    expect(importTokean && typeof importTokean === 'string').to.be.ok();
    expect(publicKey && typeof publicKey === 'string').to.be.ok();

    // import key material
    // with no backoff_period
    await client.importKeyMaterial(keyId, 'test'.toString('base64'), importTokean, Date.now() + 24 * 60 * 60 * 1000, authOption);
    // with backoff_period
    await client.importKeyMaterial(keyId, 'test'.toString('base64'), importTokean, Date.now() + 24 * 60 * 60 * 1000, runtimeOption);

    // delete key material
    // with no backoff_period
    let res3 = await client.deleteKeyMaterial(keyId, authOption);
    expect(res3 && typeof res3 === 'object').to.be.ok();
    expect(res3.HttpStatus !== 400).to.be.ok();
    expect(res3.RequestId && typeof res3.RequestId === 'string').to.be.ok();
    // with backoff_period
    res3 = await client.deleteKeyMaterial(keyId, runtimeOption);
    expect(res3 && typeof res3 === 'object').to.be.ok();
    expect(res3.HttpStatus !== 400).to.be.ok();
    expect(res3.RequestId && typeof res3.RequestId === 'string').to.be.ok();
  });

  it(`delete key & cancel key deletion after retry ${retry}times`, async function () {
    // delete key
    // with no backoff_period
    let res = await client.scheduleKeyDeletion(keyId, 7, authOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();
    // with backoff_period
    res = await client.scheduleKeyDeletion(keyId, 7, runtimeOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();

    // cancel deletion
    let res1 = await client.cancelKeyDeletion(keyId, authOption);
    expect(res1 && typeof res1 === 'object').to.be.ok();
    expect(res1.HttpStatus !== 400).to.be.ok();
    // with backoff_period
    res1 = await client.cancelKeyDeletion(keyId, runtimeOption);
    expect(res1 && typeof res1 === 'object').to.be.ok();
    expect(res1.HttpStatus !== 400).to.be.ok();
  });

  it(`create alias after retry ${retry}times`, async function () {
    // with no backoff_period
    let res = await client.createAlias(keyId, alias, authOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();
    // with backoff_period
    res = await client.createAlias(keyId, alias, runtimeOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();
  });

  it(`update alias after retry ${retry}times`, async function () {
    // with no backoff_period
    let res = await client.updateAlias(keyId, alias, authOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();
    // with backoff_period
    res = await client.updateAlias(keyId, alias, runtimeOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();
  });

  it(`list aliases after retry ${retry}times`, async function () {
    // with no backoff_period
    let res = await client.listAliases(1, 100, authOption);
    expect(res.TotalCount).to.be(2);
    expect(Array.isArray(res.Aliases.Alias)).to.be.ok();
    expect(res.Aliases.Alias.length).to.be(2);
    // with backoff_period
    res = await client.listAliases(1, 100, runtimeOption);
    expect(res.TotalCount).to.be(2);
    expect(Array.isArray(res.Aliases.Alias)).to.be.ok();
    expect(res.Aliases.Alias.length).to.be(2);
  });

  it(`list alias by id after retry ${retry}times`, async function () {
    // with no backoff_period
    let res = await client.listAliasesByKeyId(keyId, 1, 100, authOption);
    expect(res.TotalCount).to.be(1);
    expect(Array.isArray(res.Aliases.Alias)).to.be.ok();
    // with backoff_period
    res = await client.listAliasesByKeyId(keyId, 1, 100, runtimeOption);
    expect(res.TotalCount).to.be(1);
    expect(Array.isArray(res.Aliases.Alias)).to.be.ok();
  });

  it(`delete alias after retry ${retry} times`, async function () {
    // with no backoff_period
    let res = await client.deleteAlias(alias, authOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();
    // with backoff_period
    res = await client.deleteAlias(alias, runtimeOption);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();
  });
});