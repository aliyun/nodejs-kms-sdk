'use strict';

const KmsBaseClient = require('./kms');

class KmsClient {
  constructor(config) {
    this.client = new KmsBaseClient(config);
    this.defaultRuntimeOption = { timeout: 10000 };
  }

  /**
   * @description cancel key deletion which can reenable this key
   * @see https://help.aliyun.com/document_detail/44197.html
   * @param keyId {string} required: global unique identifier
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async cancelKeyDeletion(keyId, runtimeOption = {}) {
    if (!keyId) {
      throw new Error('keyId must be passed in, please see https://help.aliyun.com/document_detail/44197.html');
    }
    return this.client.CancelKeyDeletion({
      Action: 'CancelKeyDeletion',
      KeyId: keyId
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description make alias to key
   * @see https://help.aliyun.com/document_detail/68624.html
   * @param keyId {string} required: global unique identifier
   * @param aliasName {string} required: cmk alias, prefix must be 'alias/'
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async createAlias(keyId, aliasName, runtimeOption = {}) {
    if (!keyId || !aliasName) {
      throw new Error('keyId & aliasName must be passed in, please see https://help.aliyun.com/document_detail/68624.html');
    }
    return this.client.CreateAlias({
      Action: 'CreateAlias',
      KeyId: keyId,
      AliasName: aliasName
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description create new key
   * @see https://help.aliyun.com/document_detail/28947.html
   * @param origin {string} optional: Aliyun_KMS (default) or EXTERNAL
   * @param description {string} optional: description of key
   * @param keyUsage {string} optional: usage of key, default is ENCRYPT/DECRYPT
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async createKey(origin, description = '', keyUsage = 'ENCRYPT/DECRYPT', runtimeOption = {}) {
    return this.client.CreateKey({
      Action: 'CreateKey',
      Origin: origin,
      Description: description,
      KeyUsage: keyUsage
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description decrypt body of CiphertextBlob
   * @see https://help.aliyun.com/document_detail/28950.html
   * @param ciphertextBlob {string} required: ciphertext to be decrypted
   * @param encryptionContext {string} optional: key/value string, must be {string: string}
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async decrypt(ciphertextBlob, encryptionContext, runtimeOption = {}) {
    if (!ciphertextBlob) {
      throw new Error('ciphertextBlob must be passed in, please see https://help.aliyun.com/document_detail/28950.html');
    }
    return this.client.Decrypt({
      Action: 'Decrypt',
      CiphertextBlob: ciphertextBlob,
      EncryptionContext: encryptionContext
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description delete alias
   * @see https://help.aliyun.com/document_detail/68626.html
   * @param aliasName {string} required: alias name, prefix must be 'alias/'
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async deleteAlias(aliasName, runtimeOption = {}) {
    if (!aliasName) {
      throw new Error('aliasName must be passed in, please see https://help.aliyun.com/document_detail/68626.html');
    }
    return this.client.DeleteAlias({
      Action: 'DeleteAlias',
      AliasName: aliasName
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description delete key material
   * @see https://help.aliyun.com/document_detail/68623.html
   * @param keyId {string} required: global unique identifier
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async deleteKeyMaterial(keyId, runtimeOption = {}) {
    if (!keyId) {
      throw new Error('keyId must be passed in, please see https://help.aliyun.com/document_detail/68623.html');
    }
    return this.client.DeleteKeyMaterial({
      Action: 'DeleteKeyMaterial',
      KeyId: keyId
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description get description of main key
   * @see https://help.aliyun.com/document_detail/28952.html
   * @param keyId {string} required: global unique identifier
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async describeKey(keyId, runtimeOption = {}) {
    if (!keyId) {
      throw new Error('keyId must be passed in, please see https://help.aliyun.com/document_detail/28952.html');
    }
    return this.client.DescribeKey({
      Action: 'DescribeKey',
      KeyId: keyId
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description query available regions
   * @see https://help.aliyun.com/document_detail/54560.html
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async describeRegions(runtimeOption = {}) {
    return this.client.DescribeRegions({
      Action: 'DescribeRegions'
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description disable key
   * @see https://help.aliyun.com/document_detail/35151.html
   * @param keyId {string} required: global unique identifier
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async disableKey(keyId, runtimeOption = {}) {
    if (!keyId) {
      throw new Error('keyId must be passed in, please see https://help.aliyun.com/document_detail/35151.html');
    }
    return this.client.DisableKey({
      Action: 'DisableKey',
      KeyId: keyId
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description enable key
   * @see https://help.aliyun.com/document_detail/35150.html
   * @param keyId {string} required: global unique identifier
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async enableKey(keyId, runtimeOption = {}) {
    if (!keyId) {
      throw new Error('keyId must be passed in, please see https://help.aliyun.com/document_detail/35150.html');
    }
    return this.client.EnableKey({
      Action: 'EnableKey',
      KeyId: keyId
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description encrypt content
   * @see https://help.aliyun.com/document_detail/28949.html
   * @param keyId {string} required: global unique identifier
   * @param plaintext {string} required: plaintext to be encrypted (must be Base64 encoded)
   * @param encryptionContext {string} optional: key/value string, must be {string: string}
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async encrypt(keyId, plaintext, encryptionContext, runtimeOption = {}) {
    if (!keyId || !plaintext) {
      throw new Error('keyId & plaintext must be passed in, please see https://help.aliyun.com/document_detail/28949.html');
    }
    return this.client.Encrypt({
      Action: 'Encrypt',
      KeyId: keyId,
      Plaintext: plaintext,
      EncryptionContext: encryptionContext
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description generate local data key
   * @see https://help.aliyun.com/document_detail/28948.html
   * @param keyId {string} required: global unique identifier
   * @param keySpec {string} optional: AES_256 or AES_128
   * @param numberOfBytes {number} optional: length of key
   * @param encryptionContext {string} optional: key/value string, must be {string: string}
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async generateDataKey(keyId, keySpec = 'AES_256', numberOfBytes, encryptionContext, runtimeOption = {}) {
    if (!keyId) {
      throw new Error('keyId must be passed in, please see https://help.aliyun.com/document_detail/28948.html');
    }
    return this.client.GenerateDataKey({
      Action: 'GenerateDataKey',
      KeyId: keyId,
      KeySpec: keySpec,
      NumberOfBytes: numberOfBytes,
      EncryptionContext: encryptionContext
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description get the imported master key (CMK) material
   * @see https://help.aliyun.com/document_detail/68621.html
   * @param keyId {string} required: global unique identifier
   * @param wrappingAlgorithm {string} required: algorithm for encrypting key material, RSAES_PKCS1_V1_5, RSAES_OAEP_SHA_1 or RSAES_OAEP_SHA_256
   * @param wrappingKeySpec {string} required: public key type used to encrypt key material, RSA_2048
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async getParametersForImport(keyId, wrappingAlgorithm, wrappingKeySpec = 'RSA_2048', runtimeOption = {}) {
    if (!keyId || !wrappingAlgorithm || !wrappingKeySpec) {
      throw new Error('keyId & wrappingAlgorithm & wrappingKeySpec must be passed in, please see https://help.aliyun.com/document_detail/68621.html');
    }
    return this.client.GetParametersForImport({
      Action: 'GetParametersForImport',
      KeyId: keyId,
      WrappingAlgorithm: wrappingAlgorithm,
      WrappingKeySpec: wrappingKeySpec
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description
   * @see https://help.aliyun.com/document_detail/68622.html
   * @param keyId {string} required: global unique identifier
   * @param encryptedKeyMaterial {string} required: key material encrypted with base64
   * @param importToken {string} required: obtained by calling GetParametersForImport
   * @param keyMaterialExpireUnix {timestamp} optional: Key material expiration time
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async importKeyMaterial(keyId, encryptedKeyMaterial, importToken, keyMaterialExpireUnix, runtimeOption = {}) {
    if (!encryptedKeyMaterial || !importToken) {
      throw new Error('encryptedKeyMaterial & importToken must be passed in, please see https://help.aliyun.com/document_detail/68622.html');
    }
    return this.client.ImportKeyMaterial({
      Action: 'ImportKeyMaterial',
      KeyId: keyId,
      EncryptedKeyMaterial: encryptedKeyMaterial,
      ImportToken: importToken,
      KeyMaterialExpireUnix: keyMaterialExpireUnix
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description returns all aliases of the current user in the current zone
   * @see https://help.aliyun.com/document_detail/68627.html
   * @param pageNumber {number} optional: current page, default 1
   * @param pageSize {number} optional: result count (0 - 100), default 10
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async listAliases(pageNumber, pageSize, runtimeOption = {}) {
    return this.client.ListAliases({
      Action: 'ListAliases',
      PageNumber: pageNumber,
      PageSize: pageSize
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description list all aliases corresponding to the specified master key (CMK)
   * @see https://help.aliyun.com/document_detail/68628.html
   * @param keyId {string} required: global unique identifier
   * @param pageNumber {number} optional: current page, default 1
   * @param pageSize {number} optional: result count (0 - 100), default 10
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async listAliasesByKeyId(keyId, pageNumber, pageSize, runtimeOption = {}) {
    if (!keyId) {
      throw new Error('keyId must be passed in, please see https://help.aliyun.com/document_detail/68628.html');
    }
    return this.client.ListAliasesByKeyId({
      Action: 'ListAliasesByKeyId',
      KeyId: keyId,
      PageNumber: pageNumber,
      PageSize: pageSize
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description Returns all the master key IDs of the caller in the calling area
   * @see https://help.aliyun.com/document_detail/28951.html
   * @param pageNumber {number} optional: current page, default 1
   * @param pageSize {number} optional: result count (0 - 100), default 10
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async listKeys(pageNumber, pageSize, runtimeOption = {}) {
    return this.client.ListKeys({
      Action: 'ListKeys',
      PageNumber: pageNumber,
      PageSize: pageSize
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description request to delete a specified master key (CMK)
   * @see https://help.aliyun.com/document_detail/44196.html
   * @param keyId {string} required: global unique identifier
   * @param pendingWindowInDays {number} required: key pre-delete cycle, [7, 30]
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async scheduleKeyDeletion(keyId, pendingWindowInDays, runtimeOption = {}) {
    if (!keyId || !pendingWindowInDays) {
      throw new Error('keyId & pendingWindowInDays must be passed in, please see https://help.aliyun.com/document_detail/44196.html');
    }
    return this.client.ScheduleKeyDeletion({
      Action: 'ScheduleKeyDeletion',
      KeyId: keyId,
      PendingWindowInDays: pendingWindowInDays
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }

  /**
   * @description update the master key (CMK) represented by an existing alias
   * @see https://help.aliyun.com/document_detail/68625.html
   * @param keyId {string} required: global unique identifier
   * @param aliasName {string} required: the alias to be operated, prefix must be 'alias/'
   * @param runtimeOption {object} optional: set timeout, default is 10s
   */
  async updateAlias(keyId, aliasName, runtimeOption = {}) {
    if (!keyId || !aliasName) {
      throw new Error('keyId & aliasName must be passed in, please see https://help.aliyun.com/document_detail/68625.html');
    }
    return this.client.UpdateAlias({
      Action: 'UpdateAlias',
      KeyId: keyId,
      AliasName: aliasName
    }, Object.assign({}, this.defaultRuntimeOption, runtimeOption));
  }
}

module.exports = KmsClient;