// https://help.aliyun.com/document_detail/69005.html

module kms {

  model RuntimeObject = {
    ignoreSSL: boolean,
    max-attempts: number,
    backoff_policy: string,
    backoff_period: number
  }

  type @default = (string, string): string
  type @defaultNumber = (number, number): number
  type @getQuery = (object, $Request): object
  type @json = async ($Response): object
  type @is5xx = ($Response): boolean

  model CancelKeyDeletionQuery = {
    Action: string,
    KeyId: string
  }

  /**
   * @description cancel key deletion which can enable this key
   * @see https://help.aliyun.com/document_detail/44197.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  api CancelKeyDeletion(query: CancelKeyDeletionQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model CreateAliasQuery = {
    Action: string,
    KeyId: string,
    AliasName: string
  }

  /**
   * @description make alias to key
   * @see https://help.aliyun.com/document_detail/68624.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - AliasName {string} required: cmk alias, prefix must be 'alias/'
   */
  api CreateAlias(query: CreateAliasQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model CreateKeyQuery = {
    Action: string,
    Origin: string,
    Description: string,
    KeyUsage: string
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
  api CreateKey(query: CreateKeyQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model DecryptQuery = {
    Action: string,
    CiphertextBlob: string,
    EncryptionContext: string
  }

  /**
   * @description decrypt body of CiphertextBlob
   * @see https://help.aliyun.com/document_detail/28950.html
   * @param query
   *   - Action {string} required
   *   - CiphertextBlob {string} required: ciphertext to be decrypted.
   *   - EncryptionContext {string} optional: key/value string, must be {string: string}
   */
  api Decrypt(query: DecryptQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model DeleteAliasQuery = {
    Action: string,
    AliasName: string
  }

  /**
   * @description delete alias
   * @see https://help.aliyun.com/document_detail/68626.html
   * @param query
   *   - Action {string} required
   *   - AliasName {string} required: alias name, prefix must be 'alias/'
   */
  api DeleteAlias(query: DeleteAliasQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model DeleteKeyMaterialQuery = {
    Action: string,
    KeyId: string
  }

  /**
   * @description delete key material
   * @see https://help.aliyun.com/document_detail/68623.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  api DeleteKeyMaterial(query: DeleteKeyMaterialQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model DescribeKeyQuery = {
    Action: string,
    KeyId: string
  }

  /**
   * @description get description of main key
   * @see https://help.aliyun.com/document_detail/28952.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  api DescribeKey(query: DescribeKeyQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model DescribeRegionsQuery = {
    Action: string
  }

  /**
   * @description query available regions
   * @see https://help.aliyun.com/document_detail/54560.html
   * @param query
   *   - Action {string} required
   */
  api DescribeRegions(query: DescribeRegionsQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model DisableKeyQuery = {
    Action: string,
    KeyId: string
  }

  /**
   * @description disable key
   * @see https://help.aliyun.com/document_detail/35151.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  api DisableKey(query: DisableKeyQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model EnableKeyQuery = {
    Action: string,
    KeyId: string
  }

  /**
   * @description enable key
   * @see https://help.aliyun.com/document_detail/35150.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   */
  api EnableKey(query: EnableKeyQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model EncryptQuery = {
    Action: string,
    KeyId: string,
    Plaintext: string,
    EncryptionContext: string
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
  api Encrypt(query: EncryptQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model GenerateDataKeyQuery = {
    Action: string,
    KeyId: string,
    KeySpec: string,
    NumberOfBytes: number,
    EncryptionContext: string
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
  api GenerateDataKey(query: GenerateDataKeyQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model GetParametersForImportQuery = {
    Action: string,
    KeyId: string,
    WrappingAlgorithm: string,
    WrappingKeySpec: string
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
  api GetParametersForImport(query: GetParametersForImportQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model ImportKeyMaterialQuery = {
    Action: string,
    KeyId: string,
    EncryptedKeyMaterial: string,
    ImportToken: string,
    KeyMaterialExpireUnix: number
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
  api ImportKeyMaterial(query: ImportKeyMaterialQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model ListAliasesQuery = {
    Action: string,
    PageNumber: number,
    PageSize: number
  }

  /**
   * @description returns all aliases of the current user in the current zone
   * @see https://help.aliyun.com/document_detail/68627.html
   * @param query
   *   - Action {string} required
   *   - PageNumber {number} optional: current page, default 1
   *   - PageSize {number} optional: result count (0 - 100), default 10
   */
  api ListAliases(query: ListAliasesQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model ListAliasesByKeyIdQuery = {
    Action: string,
    KeyId: string,
    PageNumber: number,
    PageSize: number
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
  api ListAliasesByKeyId(query: ListAliasesByKeyIdQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model ListKeysQuery = {
    Action: string,
    PageNumber: number,
    PageSize: number
  }

  /**
   * @description Returns all the master key IDs of the caller in the calling area
   * @see https://help.aliyun.com/document_detail/28951.html
   * @param query
   *   - Action {string} required
   *   - PageNumber {number} optional: current page, default 1
   *   - PageSize {number} optional: result count (0 - 100), default 10
   */
  api ListKeys(query: ListKeysQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model ScheduleKeyDeletionQuery = {
    Action: string,
    KeyId: string,
    PendingWindowInDays: number
  }

  /**
   * @description request to delete a specified master key (CMK)
   * @see https://help.aliyun.com/document_detail/44196.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - PendingWindowInDays {number} required: key pre-delete cycle, [7, 30]
   */
  api ScheduleKeyDeletion(query: ScheduleKeyDeletionQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model UpdateAliasQuery = {
    Action: string,
    KeyId: string,
    AliasName: string
  }

  /**
   * @description update the master key (CMK) represented by an existing alias
   * @see https://help.aliyun.com/document_detail/68625.html
   * @param query
   *   - Action {string} required
   *   - KeyId {string} required: global unique identifier
   *   - AliasName {string} required: the alias to be operated, prefix must be 'alias/'
   */
  api UpdateAlias(query: UpdateAliasQuery, runtime: RuntimeObject) {
    protocol = 'https';
    method = 'GET';
    pathname = '/';
    query = @getQuery(query, __request);

    headers = {
      host = @endpoint
    };
  } returns {
    if (@is5xx(__response)) {
      retry;
    }

    return @json(__response);
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = true,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max-attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }
}