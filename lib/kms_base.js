'use strict';

const qs = require('querystring');
const crypto = require('crypto');
const { $read } = require('@alicloud/http-core-sdk');

class KmsBase {
  constructor(config) {
    if (!config) {
      throw new Error('config must be passed in');
    }

    const endpoint = config.endpoint;
    if (!endpoint) {
      throw new Error('config.endpoint must be passed in, please see https://help.aliyun.com/document_detail/69006.html to chose one');
    }
    this.__endpoint = endpoint;

    const accessKeyId = config.accessKey;
    if (!accessKeyId) {
      throw new Error('config.accessKeyId must be passed in');
    }
    this.__accessKeyId = accessKeyId;

    const secretKey = config.secretKey;
    if (!secretKey) {
      throw new Error('config.secretKey must be passed in');
    }
    this.secretKey = secretKey;

    // optional config
    this.apiVersion = config.apiVersion || '2016-01-20';
  }

  __default(par, def) {
    return par || def;
  }

  __defaultNumber(par, def) {
    return !isNaN(par) && par !== null ? par : def;
  }

  async __json(response) {
    const buf = await $read(response);
    const res = buf.toString();
    try {
      return JSON.parse(res);
    } catch (e) {
      throw new Error(`return value must be json: ${res}`);
    }
  }

  __is5xx(response) {
    return response.statusCode >= 500;
  }

  __getQuery(query, request) {
    // common param
    query.Format = 'json';
    // TODO: api 版本去哪里查看，存疑？
    query.Version = this.apiVersion;
    query.AccessKeyId = this.__accessKeyId;
    query.SignatureMethod = 'HMAC-SHA1';
    query.Timestamp = new Date().toISOString();
    query.SignatureVersion = '1.0';

    // get signature
    const sortedQuery = Object.entries(query).sort().reduce((q, [k, v]) => {
      if (v) {
        q[k] = v;
      }
      return q;
    }, {});
    const method = request.method && request.method.toUpperCase() || 'GET';
    const sign = `${this.secretKey}&`;
    let str = `${method}&${encodeURIComponent('/')}&` + encodeURIComponent(qs.stringify(sortedQuery));
    query.Signature = crypto.createHmac('sha1', sign).update(str).digest().toString('base64');

    return query;
  }
}

module.exports = KmsBase;