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

    if (config.credential) {
      this.credential = config.credential;
    } else {
      const accessKeyId = config.accessKey || config.accessKeyId;
      if (!accessKeyId) {
        throw new Error('config.accessKeyId must be passed in');
      }
      this.__accessKeyId = accessKeyId;

      const accessKeySecret = config.secretKey || config.accessKeySecret;
      if (!accessKeySecret) {
        throw new Error('config.accessKeySecret must be passed in');
      }
      this.accessKeySecret = accessKeySecret;
    }

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

  async getCredential() {
    if (this.credential) {
      const cred = await this.credential.getCredential();
      return cred;
    }
    return {
      accessKeyId: this.__accessKeyId,
      accessKeySecret: this.accessKeySecret
    };
  }

  async __getQuery(query, request) {
    const credential = await this.getCredential();
    // common param
    query.Format = 'json';
    // TODO: api 版本去哪里查看，存疑？
    query.Version = this.apiVersion;
    query.AccessKeyId = credential.accessKeyId;
    query.SignatureMethod = 'HMAC-SHA1';
    query.Timestamp = new Date().toISOString();
    query.SignatureVersion = '1.0';
    if (credential.securityToken) {
      request.headers['x-acs-security-token'] = credential.securityToken;
      query.SecurityToken = credential.securityToken;
    }
    if (credential.bearerToken) {
      request.headers['x-acs-bearer-token'] = credential.bearerToken;
      query.BearerToken = credential.bearerToken;
    }

    // get signature
    const sortedQuery = Object.entries(query).sort().reduce((q, [k, v]) => {
      if (v) {
        q[k] = v;
      }
      return q;
    }, {});
    const method = request.method && request.method.toUpperCase() || 'GET';
    const sign = `${credential.accessKeySecret}&`;
    let str = `${method}&${encodeURIComponent('/')}&` + encodeURIComponent(qs.stringify(sortedQuery));
    query.Signature = crypto.createHmac('sha1', sign).update(str).digest().toString('base64');

    return query;
  }
}

module.exports = KmsBase;