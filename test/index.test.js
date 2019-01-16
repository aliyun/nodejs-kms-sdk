'use strict';

const expect = require('expect.js');
const KmsClient = require('../lib/');

describe('kms export client should success', function () {
  const client = new KmsClient({
    endpoint: 'kms.cn-hangzhou.aliyuncs.com',
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY,
    apiVersion: '2016-01-20'
  });

  let keyId = '';
  let keyId1 = '';
  const date = new Date().toLocaleString();
  const alias = `alias/unit-test-${date}`.replace(/[\s+,:]/g, '-');
  const alias1 = `alias/unit-test-${date}-1`.replace(/[\s+,:]/g, '-');

  it('delete all exist key & alias', async function () {
    // delete keys
    const res = await client.listKeys(1, 100);
    expect(Array.isArray(res.Keys.Key)).to.be.ok();
    if (res.TotalCount > res.PageSize * res.PageNumber) {
      const totalPage = (res.TotalCount % (res.PageSize * res.PageNumber)) + 1;
      const left = [];
      for (let i = 2; i <= totalPage; i++) {
        left.push(client.listKeys(i, 100));
      }
      let leftKeys = await Promise.all(left);
      leftKeys.forEach(r => {
        expect(Array.isArray(r.Keys.Key)).to.be.ok();
        res.Keys.Key = res.Keys.Key.concat(r.Keys.Key);
      });
    }
    const keys = res.Keys.Key.map(k => k.KeyId);
    const deletion = keys.map(k => client.scheduleKeyDeletion(k, 7));
    await Promise.all(deletion);
    // delete alias
    const res1 = await client.listAliases(1, 100);
    expect(Array.isArray(res1.Aliases.Alias)).to.be.ok();
    const aliases = res1.Aliases.Alias.map(a => a.AliasName);
    const deletion2 = aliases.map(a => client.deleteAlias(a));
    await Promise.all(deletion2);
  });

  it('describe regions', async function () {
    const res = await client.describeRegions();
    expect(Array.isArray(res.Regions.Region)).to.be.ok();
  });

  it('create key', async function () {
    const res = await client.createKey('Aliyun_KMS', `unit test create key ${new Date().toLocaleString()}`, 'ENCRYPT/DECRYPT');
    const keyMetadata = res.KeyMetadata;
    expect(keyMetadata && typeof keyMetadata === 'object').to.be.ok();
    expect(keyMetadata.KeyState).to.be('Enabled');
    const id = keyMetadata.KeyId;
    expect(id && typeof id === 'string').to.be.ok();
    keyId = id;
    // create another keyId
    const res1 = await client.createKey('Aliyun_KMS', `unit test create key ${new Date().toLocaleString()}-1`, 'ENCRYPT/DECRYPT');
    keyId1 = res1.KeyMetadata.KeyId;
  });

  it('list keys', async function () {
    const res = await client.listKeys(1, 100);
    expect(Array.isArray(res.Keys.Key)).to.be.ok();
    if (res.TotalCount > res.PageSize * res.PageNumber) {
      const totalPage = (res.TotalCount % (res.PageSize * res.PageNumber)) + 1;
      const left = [];
      for (let i = 2; i <= totalPage; i++) {
        left.push(client.listKeys(i, 100));
      }
      let leftKeys = await Promise.all(left);
      leftKeys.forEach(r => expect(Array.isArray(r.Keys.Key)).to.be.ok());
    }
  });

  it('describe key', async function () {
    // invalid prams
    let error = '';
    try {
      await client.describeKey();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('keyId must be passed in, please see https://help.aliyun.com/document_detail/28952.html');
    // valid params
    const res = await client.describeKey(keyId);
    const keyMetadata = res.KeyMetadata;
    expect(keyMetadata && typeof keyMetadata === 'object').to.be.ok();
    expect(keyMetadata.KeyState).to.be('Enabled');
  });

  it('encrypt & decrypt data', async function () {
    //test encrypt
    // invalid prams
    let error = '';
    try {
      await client.encrypt();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('keyId & plaintext must be passed in, please see https://help.aliyun.com/document_detail/28949.html');
    // valid params
    const plaintext = 'hello kms sdk for node.js';
    const res = await client.encrypt(keyId, plaintext.toString('base64'), JSON.stringify({ k: 'v' }));
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    const blob = res.CiphertextBlob;
    expect(typeof blob).to.be('string');

    // test decrypt
    try {
      await client.decrypt();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('ciphertextBlob must be passed in, please see https://help.aliyun.com/document_detail/28950.html');
    // valid params
    const res1 = await client.decrypt(blob, JSON.stringify({ k: 'v' }));
    expect(res1 && typeof res1 === 'object').to.be.ok();
    expect(res1.HttpStatus !== 400).to.be.ok();
    expect(res1.Plaintext).to.be(plaintext);
  });

  it('disable & enable key', async function () {
    //test disable
    // invalid prams
    let error = '';
    try {
      await client.disableKey();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('keyId must be passed in, please see https://help.aliyun.com/document_detail/35151.html');
    // valid params
    const res = await client.disableKey(keyId);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();
    // check if disabled
    const desc = await client.describeKey(keyId);
    const keyMetadata = desc.KeyMetadata;
    expect(keyMetadata && typeof keyMetadata === 'object').to.be.ok();
    expect(keyMetadata.KeyState).to.be('Disabled');

    // test enable
    try {
      await client.enableKey();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('keyId must be passed in, please see https://help.aliyun.com/document_detail/35150.html');
    // valid params
    const res1 = await client.enableKey(keyId);
    expect(res1 && typeof res1 === 'object').to.be.ok();
    expect(res1.HttpStatus !== 400).to.be.ok();
    expect(res1.RequestId && typeof res1.RequestId === 'string').to.be.ok();
    // check if enabled
    const desc1 = await client.describeKey(keyId);
    const keyMetadata1 = desc1.KeyMetadata;
    expect(keyMetadata1 && typeof keyMetadata1 === 'object').to.be.ok();
    expect(keyMetadata1.KeyState).to.be('Enabled');
  });

  it('generate local data key', async function () {
    // invalid prams
    let error = '';
    try {
      await client.generateDataKey();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('keyId must be passed in, please see https://help.aliyun.com/document_detail/28948.html');
    // valid params
    const res = await client.generateDataKey(keyId);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(typeof res.Plaintext === 'string').to.be.ok();
    expect(typeof res.CiphertextBlob === 'string').to.be.ok();
  });

  it('import external key material', async function () {
    const res = await client.createKey('EXTERNAL');
    const externalKeyId = res.KeyMetadata.KeyId;
    // test get params for import
    // invalid prams
    let error = '';
    try {
      await client.getParametersForImport();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('keyId & wrappingAlgorithm & wrappingKeySpec must be passed in, please see https://help.aliyun.com/document_detail/68621.html');
    // valid params
    const res1 = await client.getParametersForImport(externalKeyId, 'RSAES_OAEP_SHA_256', 'RSA_2048');
    const importTokean = res1.ImportToken;
    const publicKey = res1.PublicKey;
    expect(importTokean && typeof importTokean === 'string').to.be.ok();
    expect(publicKey && typeof publicKey === 'string').to.be.ok();

    // test import key material
    try {
      await client.importKeyMaterial();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('encryptedKeyMaterial & importToken must be passed in, please see https://help.aliyun.com/document_detail/68622.html');
    // TODO: valid params
    await client.importKeyMaterial(externalKeyId, 'test'.toString('base64'), importTokean, Date.now() + 24 * 60 * 60 * 1000);

    // test delete key material
    try {
      await client.deleteKeyMaterial();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('keyId must be passed in, please see https://help.aliyun.com/document_detail/68623.html');
    // valid params
    const res3 = await client.deleteKeyMaterial(externalKeyId);
    expect(res3 && typeof res3 === 'object').to.be.ok();
    expect(res3.HttpStatus !== 400).to.be.ok();
    expect(res3.RequestId && typeof res3.RequestId === 'string').to.be.ok();

    // delete tmp keyId
    await client.scheduleKeyDeletion(externalKeyId, 7);
  });

  it('delete key & cancel key deletion', async function () {
    // invalid prams
    // test delete key
    let error = '';
    try {
      await client.scheduleKeyDeletion();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('keyId & pendingWindowInDays must be passed in, please see https://help.aliyun.com/document_detail/44196.html');
    // valid params
    const res = await client.scheduleKeyDeletion(keyId, 7);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();
    // check if key is in deletion
    const desc = await client.describeKey(keyId);
    const keyMetadata = desc.KeyMetadata;
    expect(keyMetadata && typeof keyMetadata === 'object').to.be.ok();
    expect(keyMetadata.KeyState).to.be('PendingDeletion');

    // test cancel deletion
    try {
      await client.cancelKeyDeletion();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('keyId must be passed in, please see https://help.aliyun.com/document_detail/44197.html');
    // valid params
    const res1 = await client.cancelKeyDeletion(keyId);
    expect(res1 && typeof res1 === 'object').to.be.ok();
    expect(res1.HttpStatus !== 400).to.be.ok();
    // check if key is enabled
    const desc1 = await client.describeKey(keyId);
    const keyMetadata1 = desc1.KeyMetadata;
    expect(keyMetadata1 && typeof keyMetadata1 === 'object').to.be.ok();
    expect(keyMetadata1.KeyState).to.be('Enabled');
  });

  it('create alias', async function () {
    // invalid prams
    let error = '';
    try {
      await client.createAlias();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('keyId & aliasName must be passed in, please see https://help.aliyun.com/document_detail/68624.html');
    // valid params
    const res = await client.createAlias(keyId, alias);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();
    // create another keyId
    await client.createAlias(keyId, alias1);
  });

  it('update alias', async function () {
    // invalid prams
    let error = '';
    try {
      await client.updateAlias();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('keyId & aliasName must be passed in, please see https://help.aliyun.com/document_detail/68625.html');
    // valid params
    const res = await client.updateAlias(keyId1, alias1);
    expect(res && typeof res === 'object').to.be.ok();
    expect(res.HttpStatus !== 400).to.be.ok();
    expect(res.RequestId && typeof res.RequestId === 'string').to.be.ok();
  });

  it('list aliases', async function () {
    const res = await client.listAliases(1, 100);
    expect(res.TotalCount).to.be(2);
    expect(Array.isArray(res.Aliases.Alias)).to.be.ok();
    expect(res.Aliases.Alias.length).to.be(2);
  });

  it('list alias by id', async function () {
    // invalid prams
    let error = '';
    try {
      await client.listAliasesByKeyId();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('keyId must be passed in, please see https://help.aliyun.com/document_detail/68628.html');
    // valid params
    // keyId - alias
    const res = await client.listAliasesByKeyId(keyId, 1, 100);
    expect(res.TotalCount).to.be(1);
    expect(Array.isArray(res.Aliases.Alias)).to.be.ok();
    expect(res.Aliases.Alias.length).to.be(1);
    res.Aliases.Alias.forEach(a => expect(a.AliasName).to.be(alias));
    // keyId1 - alias1
    const res1 = await client.listAliasesByKeyId(keyId1, 1, 100);
    expect(res1.TotalCount).to.be(1);
    expect(Array.isArray(res1.Aliases.Alias)).to.be.ok();
    expect(res1.Aliases.Alias.length).to.be(1);
    res1.Aliases.Alias.forEach(a => expect(a.AliasName).to.be(alias1));
  });

  it('delete alias', async function () {
    // invalid prams
    let error = '';
    try {
      await client.deleteAlias();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('aliasName must be passed in, please see https://help.aliyun.com/document_detail/68626.html');
    // valid params
    const res = await client.listAliases(1, 100);
    expect(Array.isArray(res.Aliases.Alias)).to.be.ok();
    const aliases = res.Aliases.Alias.map(a => a.AliasName);
    const deletion = aliases.map(a => client.deleteAlias(a));
    await Promise.all(deletion);

    // delete all key
    await Promise.all([
      client.scheduleKeyDeletion(keyId, 7),
      client.scheduleKeyDeletion(keyId1, 7),
    ]);
  });
});