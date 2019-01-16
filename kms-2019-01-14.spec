// https://help.aliyun.com/document_detail/69005.html

module kms {
  model RuntimeObject = {
    max-attempts: number,
    backoff_policy: string,
    backoff_period: number
  }

  model QueryObject = {

  }

  type @default = (string, string): string
  type @default_number = (number, number): number
  type @get_path = (object): string
  type @json = async ($Response): object
  type @is_5xx = ($Response): boolean

  /**
   * @description cancel key deletion which can reenable this key
   * @see https://help.aliyun.com/document_detail/44197.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  api CancelKeyDeletion(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description make alias to key
   * @see https://help.aliyun.com/document_detail/68624.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - AliasName {string} required: cmk alias, prefix must be 'alias/'
   */
  api CreateAlias(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
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
  api CreateKey(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description decrypt body of CiphertextBlob
   * @see https://help.aliyun.com/document_detail/28950.html
   * @param query
   *   - Action {string} required
   *   - CiphertextBlob {string} required: ciphertext to be decrypted.
   *   - EncryptionContext {string} optional: key/value string, must be {string: string}
   */
  api Decrypt(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description delete alias
   * @see https://help.aliyun.com/document_detail/68626.html
   * @param query
   *   - Action {string} required
   *   - AliasName {string} required: alias name, prefix must be 'alias/'
   */
  api DeleteAlias(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description delete key material
   * @see https://help.aliyun.com/document_detail/68623.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  api DeleteKeyMaterial(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description get description of main key
   * @see https://help.aliyun.com/document_detail/28952.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  api DescribeKey(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description query available regions
   * @see https://help.aliyun.com/document_detail/54560.html
   * @param query
   *   - Action {string} required
   */
  api DescribeRegions(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description disable key
   * @see https://help.aliyun.com/document_detail/35151.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  api DisableKey(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description enable key
   * @see https://help.aliyun.com/document_detail/35150.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  api EnableKey(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
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
  api Encrypt(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
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
  api GenerateDataKey(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
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
  api GetParametersForImport(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description
   * @see https://help.aliyun.com/document_detail/68622.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - EncryptedKeyMaterial {string} required: key material encrypted with base64
   *   - ImportToken {string} required: obtained by calling GetParametersForImport
   *   - KeyMaterialExpireUnix {timestamp} optional: Key material expiration time
   */
  api ImportKeyMaterial(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description returns all aliases of the current user in the current zone
   * @see https://help.aliyun.com/document_detail/68627.html
   * @param query
   *   - Action {string} required
   *   - PageNumber {number} optional: current page, default 1
   *   - PageSize {number} optional: result count (0 - 100), default 10
   */
  api ListAliases(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
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
  api ListAliasesByKeyId(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description Returns all the master key IDs of the caller in the calling area
   * @see https://help.aliyun.com/document_detail/28951.html
   * @param query
   *   - Action {string} required
   *   - PageNumber {number} optional: current page, default 1
   *   - PageSize {number} optional: result count (0 - 100), default 10
   */
  api ListKeys(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description request to delete a specified master key (CMK)
   * @see https://help.aliyun.com/document_detail/44196.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - PendingWindowInDays {number} required: key pre-delete cycle, [7, 30]
   */
  api ScheduleKeyDeletion(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }

  /**
   * @description update the master key (CMK) represented by an existing alias
   * @see https://help.aliyun.com/document_detail/68625.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - AliasName {string} required: the alias to be operated, prefix must be 'alias/'
   */
  api UpdateAlias(query: QueryObject, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = @get_path(query);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is_5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @default_number(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @default_number(runtime.backoff_period, 1)
    },
    ignoreSSL = false
  }
}