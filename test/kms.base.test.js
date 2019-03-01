'use strict';

const fs = require('fs');
const path = require('path');
const expect = require('expect.js');
const KmsBaseClient = require('../lib/kms_base');

describe('kms base client should success', function () {
  it('init kms base client constructor', async function () {
    // check config
    let error = '';
    try {
      new KmsBaseClient({
        endpoint: 'kms.cn-hangzhou.aliyuncs.com',
        accessKeyId: 'xxxxxx',
        accessKeySecret: 'xxxxxx'
      });
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('');
    try {
      new KmsBaseClient();
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('config must be passed in');
    try {
      new KmsBaseClient({});
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('config.endpoint must be passed in, please see https://help.aliyun.com/document_detail/69006.html to chose one');
    try {
      new KmsBaseClient({
        endpoint: 'kms.cn-hangzhou.aliyuncs.com',
        namespace: 'xxxxxx'
      });
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('config.accessKeyId must be passed in');
    try {
      new KmsBaseClient({
        endpoint: 'kms.cn-hangzhou.aliyuncs.com',
        namespace: 'xxxxxx',
        accessKeyId: 'xxxxxx',
      });
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('config.accessKeySecret must be passed in');
  });

  const client = new KmsBaseClient({
    endpoint: 'kms.cn-hangzhou.aliyuncs.com',
    accessKeyId: process.env.ACCESS_KEY,
    accessKeySecret: process.env.SECRET_KEY
  });

  it('return correct value', function () {
    // string
    expect(client.__default('value', 'default')).to.be('value');
    expect(client.__default(undefined, 'default')).to.be('default');
    expect(client.__default(null, 'default')).to.be('default');

    // number
    expect(client.__defaultNumber(0, 3)).to.be(0);
    expect(client.__defaultNumber(1, 3)).to.be(1);
    expect(client.__defaultNumber(undefined, 3)).to.be(3);
    expect(client.__defaultNumber(null, 3)).to.be(3);
  });

  it('parse response as json', async function () {
    // valid json
    const request1 = fs.createReadStream(path.join(__dirname, './fixtures/valid_json.txt'));
    request1.headers = { 'content-encoding': null };
    const josn1 = await client.__json(request1);
    expect(josn1.k1).to.be('v1');
    expect(josn1.k2).to.be('v2');

    // invalid json
    const request2 = fs.createReadStream(path.join(__dirname, './fixtures/invalid_json.txt'));
    request2.headers = { 'content-encoding': null };
    let error = '';
    try {
      await client.__json(request2);
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('return value must be json: {k1:v1,k2:v2}');
  });

  it('response 5xx', function () {
    expect(client.__is5xx({ statusCode: 499 })).to.be(false);
    expect(client.__is5xx({ statusCode: 500 })).to.be(true);
    expect(client.__is5xx({ statusCode: 501 })).to.be(true);
  });

  it('get query correct', async function () {
    const sign1 = await client.__getQuery({}, { headers: {} });
    expect(typeof sign1.Signature).to.be('string');
    const sign2 = await client.__getQuery({}, { headers: {}, method: 'POST' });
    expect(typeof sign2.Signature).to.be('string');
    expect(sign1 !== sign2).to.be.ok();
  });
});

describe('kms base client should success with sts credential', function () {
  let client2;
  it('init kms base client constructor', function () {
    let error = '';
    try {
      client2 = new KmsBaseClient({
        endpoint: 'kms.cn-hangzhou.aliyuncs.com',
        credential: {
          getCredential() {
            return {
              accessKeyId: '***',
              accessKeySecret: '***',
              securityToken: '***'
            };
          }
        }
      });
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('');
  });

  it('get query correct', async function () {
    const sign1 = await client2.__getQuery({}, { headers: {} });
    expect(typeof sign1.Signature).to.be('string');
    const sign2 = await client2.__getQuery({}, { headers: {}, method: 'POST' });
    expect(typeof sign2.Signature).to.be('string');
    expect(sign1 !== sign2).to.be.ok();
  });
});

describe('kms base client should success with bearer token', function () {
  let client2;
  it('init kms base client constructor', function () {
    let error = '';
    try {
      client2 = new KmsBaseClient({
        endpoint: 'kms.cn-hangzhou.aliyuncs.com',
        credential: {
          getCredential() {
            return {
              bearerToken: '***'
            };
          }
        }
      });
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('');
  });

  it('get query correct', async function () {
    const sign1 = await client2.__getQuery({}, { headers: {} });
    expect(typeof sign1.Signature).to.be('string');
    const sign2 = await client2.__getQuery({}, { headers: {}, method: 'POST' });
    expect(typeof sign2.Signature).to.be('string');
    expect(sign1 !== sign2).to.be.ok();
  });
});