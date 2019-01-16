'use strict';

const fs = require('fs');
const path = require('path');
const expect = require('expect.js');
const KmsBaseClient = require('../lib/kms_base');

describe('kms base client should success', function () {
  it('init acm base client constructor', async function () {
    // check config
    let error = '';
    try {
      new KmsBaseClient({
        endpoint: 'kms.cn-hangzhou.aliyuncs.com',
        accessKey: 'xxxxxx',
        secretKey: 'xxxxxx'
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
        accessKey: 'xxxxxx',
      });
    } catch (e) {
      error = e.message;
    }
    expect(error).to.be('config.secretKey must be passed in');
  });

  const client = new KmsBaseClient({
    endpoint: 'kms.cn-hangzhou.aliyuncs.com',
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY
  });

  it('return correct value', function () {
    // string
    expect(client.__default('value', 'default')).to.be('value');
    expect(client.__default(undefined, 'default')).to.be('default');
    expect(client.__default(null, 'default')).to.be('default');

    // number
    expect(client.__default_number(0, 3)).to.be(0);
    expect(client.__default_number(1, 3)).to.be(1);
    expect(client.__default_number(undefined, 3)).to.be(3);
    expect(client.__default_number(null, 3)).to.be(3);
  });

  it('get path correct', function () {
    const path = client.__get_path({ k1: 'v1' });
    expect(typeof path).to.be('string');
    expect(path.startsWith('/?')).to.be.ok();
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
    expect(client.__is_5xx({ statusCode: 499 })).to.be(false);
    expect(client.__is_5xx({ statusCode: 500 })).to.be(true);
    expect(client.__is_5xx({ statusCode: 501 })).to.be(true);
  });

  it('signature correct', function () {
    const sign1 = client.getSignature({ k: 'v' });
    expect(typeof sign1).to.be('string');
    const sign2 = client.getSignature({ k: 'v' }, 'POST');
    expect(typeof sign2).to.be('string');
    expect(sign1 !== sign2).to.be.ok();
  });
});