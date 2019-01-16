'use strict';

const {
  $send,
  $allowRetry,
  $getBackoffTime,
  $sleep,
  $retryError,
  $unableRetryError
} = require('@alicloud/http-core-sdk');
const KmsBase = require('./kms_base');
  
class KmsClient extends KmsBase {
  constructor(config) {
    super(config);
  }
  
  /**
   * @description cancel key deletion which can reenable this key
   * @see https://help.aliyun.com/document_detail/44197.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  async CancelKeyDeletion(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description make alias to key
   * @see https://help.aliyun.com/document_detail/68624.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - AliasName {string} required: cmk alias, prefix must be 'alias/'
   */
  async CreateAlias(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description create new key
   * @see https://help.aliyun.com/document_detail/28947.html
   * @param query
   *   - Action {string} required
   *   - Origin {string} optional: Aliyun_KMS (default) or EXTERNAL
   *   - Description {string} optional: description of key
   *   - KeyUsage {string} optional: usage of key, default is ENCRYPT/DECRYPT
   */
  async CreateKey(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description decrypt body of CiphertextBlob
   * @see https://help.aliyun.com/document_detail/28950.html
   * @param query
   *   - Action {string} required
   *   - CiphertextBlob {string} required: ciphertext to be decrypted.
   *   - EncryptionContext {string} optional: key/value string, must be {string: string}
   */
  async Decrypt(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description delete alias
   * @see https://help.aliyun.com/document_detail/68626.html
   * @param query
   *   - Action {string} required
   *   - AliasName {string} required: alias name, prefix must be 'alias/'
   */
  async DeleteAlias(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description delete key material
   * @see https://help.aliyun.com/document_detail/68623.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  async DeleteKeyMaterial(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description get description of main key
   * @see https://help.aliyun.com/document_detail/28952.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  async DescribeKey(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description query available regions
   * @see https://help.aliyun.com/document_detail/54560.html
   * @param query
   *   - Action {string} required
   */
  async DescribeRegions(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description disable key
   * @see https://help.aliyun.com/document_detail/35151.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  async DisableKey(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description enable key
   * @see https://help.aliyun.com/document_detail/35150.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  async EnableKey(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description encrypt content
   * @see https://help.aliyun.com/document_detail/28949.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - Plaintext {string} required: plaintext to be encrypted (must be Base64 encoded)
   *   - EncryptionContext {string} optional: key/value string, must be {string: string}
   */
  async Encrypt(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description generate local data key
   * @see https://help.aliyun.com/document_detail/28948.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - KeySpec {string} optional: AES_256 or AES_128
   *   - NumberOfBytes {number} optional: length of key
   *   - EncryptionContext {string} optional: key/value string, must be {string: string}
   */
  async GenerateDataKey(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description get the imported master key (CMK) material
   * @see https://help.aliyun.com/document_detail/68621.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - WrappingAlgorithm {string} required: algorithm for encrypting key material, RSAES_PKCS1_V1_5, RSAES_OAEP_SHA_1 or RSAES_OAEP_SHA_256
   *   - WrappingKeySpec {string} required: public key type used to encrypt key material, RSA_2048
   */
  async GetParametersForImport(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description
   * @see https://help.aliyun.com/document_detail/68622.html
   * @param query
   *   - Action {string} required
   *   - EncryptedKeyMaterial {string} required: key material encrypted with base64
   *   - ImportToken {string} required: obtained by calling GetParametersForImport
   *   - KeyMaterialExpireUnix {timestamp} optional: Key material expiration time
   */
  async ImportKeyMaterial(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description returns all aliases of the current user in the current zone
   * @see https://help.aliyun.com/document_detail/68627.html
   * @param query
   *   - Action {string} required
   *   - PageNumber {number} optional: current page, default 1
   *   - PageSize {number} optional: result count (0 - 100), default 10
   */
  async ListAliases(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description list all aliases corresponding to the specified master key (CMK)
   * @see https://help.aliyun.com/document_detail/68628.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - PageNumber {number} optional: current page, default 1
   *   - PageSize {number} optional: result count (0 - 100), default 10
   */
  async ListAliasesByKeyId(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description Returns all the master key IDs of the caller in the calling area
   * @see https://help.aliyun.com/document_detail/28951.html
   * @param query
   *   - Action {string} required
   *   - PageNumber {number} optional: current page, default 1
   *   - PageSize {number} optional: result count (0 - 100), default 10
   */
  async ListKeys(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description request to delete a specified master key (CMK)
   * @see https://help.aliyun.com/document_detail/44196.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - PendingWindowInDays {number} required: key pre-delete cycle, [7, 30]
   */
  async ScheduleKeyDeletion(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

  /**
   * @description update the master key (CMK) represented by an existing alias
   * @see https://help.aliyun.com/document_detail/68625.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - AliasName {string} required: the alias to be operated, prefix must be 'alias/'
   */
  async UpdateAlias(query, runtime) {
    const $runtime = {
      timeout: 10000,
      timeouted: 'retry',
      retry: {
        retryable: true,
        policy: 'simple',
        'max-attempts': this.__default_number(runtime['max-attempts'], 3),
      },
      backoff: {
        policy: this.__default(runtime.backoff_policy, 'no'),
        period: this.__default_number(runtime.backoff_period, 1),
      },
      ignoreSSL: false,
    };

    var $lastRequest;
    var $now = Date.now();
    for (var $retryTimes = 0; $allowRetry($runtime.retry, $retryTimes, $now); $retryTimes++) {
      if ($retryTimes > 0) {
        const $backoffTime = $getBackoffTime($runtime.backoff, $retryTimes);
        if ($backoffTime > 0) {
          await $sleep($backoffTime);
        }
      }

      try {
        const $request = {};
        $request.protocol = 'https';
        $request.method = 'GET';
        $request.pathname = this.__get_path(query);
        $request.headers = {
          host: this.__endpoint,
        };
        $lastRequest = $request;
        const $response = await $send($request, $runtime);

        if (this.__is_5xx($response)) {
          throw $retryError($request, $response);
        }

        return this.__json($response);
      } catch (ex) {
        if (ex.retryable) {
          continue;
        }
        throw ex;
      }
    }

    throw $unableRetryError($lastRequest);
  }

}
  
module.exports = KmsClient;

