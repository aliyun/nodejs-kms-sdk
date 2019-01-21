# Alibaba Cloud KMS client for Node.js

[![npm version](https://badge.fury.io/js/@alicloud%2fkms-sdk.svg)](https://badge.fury.io/js/@alicloud%2fkms-sdk.svg)
[![Travis Build Status](https://api.travis-ci.org/aliyun/nodejs-kms-sdk.png?branch=master)](https://travis-ci.org/aliyun/nodejs-kms-sdk)
[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/5ow9oa34730r0wdy?svg=true)](https://ci.appveyor.com/project/hyj1991/nodejs-kms-sdk)
[![codecov](https://codecov.io/gh/aliyun/nodejs-kms-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/aliyun/nodejs-kms-sdk)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

## Installation

```bash
npm install @alicloud/kms-sdk
```

**Node.js >= 8.5.0** required.

## Usage

```js
const KmsClient = require('@alicloud/kms-sdk');

const kms = new KmsClient({
  endpoint: 'kms.cn-hangzhou.aliyuncs.com', // check this from kms console
  accessKey: '***************', // check this from aliyun console
  secretKey: '***************', // check this from aliyun console
});

async function demo() {
  // describe regions
  const regions = await client.describeRegions();
  console.log(`regions: ${JSON.stringify(regions)}`);

  // create key
  const creation = await client.createKey('Aliyun_KMS', `demo`, 'ENCRYPT/DECRYPT');
  const keyId = creation.KeyMetadata.KeyId;
  console.log(`creation: ${JSON.stringify(creation)}`);

  // list keys
  const keys = await client.listKeys(1, 100);
  console.log(`keys: ${JSON.stringify(keys)}`);

  // describe key
  const description = await client.describeKey(keyId);
  console.log(`description: ${JSON.stringify(description)}`);

  // encrypt
  const plaintext = 'hello kms sdk for node.js';
  const encrypt = await client.encrypt(keyId, plaintext.toString('base64'), JSON.stringify({ k: 'v' }));
  const blob = encrypt.CiphertextBlob;
  console.log(`description: ${JSON.stringify(description)}`);

  // decrypt
  const decrypt = await client.decrypt(blob, JSON.stringify({ k: 'v' }));
  const rawtext = decrypt.Plaintext;
  console.log(`rawtext: ${rawtext}`);

  // disable key
  const disable = await client.disableKey(keyId);
  console.log(`disable: ${JSON.stringify(disable)}`);

  // enable key
  const enable = await client.enableKey(keyId);
  console.log(`enable: ${JSON.stringify(enable)}`);

  // generate local data key
  const generateKey = await client.generateDataKey(keyId);
  console.log(`generateKey: ${JSON.stringify(generateKey)}`);

  // get params for import
  const res = await client.createKey('EXTERNAL');
  const externalKeyId = res.KeyMetadata.KeyId;
  const params = await client.getParametersForImport(externalKeyId, 'RSAES_OAEP_SHA_256', 'RSA_2048');
  const importTokean = res1.ImportToken;
  console.log(`import params: ${JSON.stringify(params)}`);

  // import key material
  const importKey = await client.importKeyMaterial(externalKeyId, 'test'.toString('base64'), importTokean, Date.now() + 24 * 60 * 60 * 1000);
  console.log(`import key: ${JSON.stringify(importKey)}`);

  // delete key material
  const deleteKeyMaterial = await client.deleteKeyMaterial(externalKeyId);
  console.log(`delete key material: ${JSON.stringify(deleteKeyMaterial)}`);

  // schedule delete key
  const deletion = await client.scheduleKeyDeletion(keyId, 7);
  console.log(`deletion: ${JSON.stringify(deletion)}`);

  // cancel deletion
  const cancel = await client.cancelKeyDeletion(keyId);
  console.log(`cancel: ${JSON.stringify(cancel)}`);

  // create alias
  const alias = `alias/demo`;
  const createAlias = await client.createAlias(keyId, alias);
  console.log(`createAlias: ${JSON.stringify(createAlias)}`);

  // update alias
  const creation1 = await client.createKey('Aliyun_KMS', `demo`, 'ENCRYPT/DECRYPT');
  const keyId1 = creation1.KeyMetadata.KeyId;
  const alias1 = `alias/demo1`;
  await client.createAlias(keyId, alias1);
  const updateAlias = await client.updateAlias(keyId1, alias1);
  console.log(`updateAlias: ${JSON.stringify(updateAlias)}`);

  // list aliases
  const listAlias = await client.listAliases(1, 100);
  console.log(`listAlias: ${JSON.stringify(listAlias)}`);

  // list alias by id
  const listAliasById = await client.listAliasesByKeyId(keyId, 1, 100);
  console.log(`listAliasById: ${JSON.stringify(listAliasById)}`);

  // delete alias
  const deleteAlias = await client.deleteAlias(alias);
  console.log(`deleteAlias: ${JSON.stringify(deleteAlias)}`);
}

demo();
```

## API Doc

### Method:  `describeRegions()`

#### Returns

* **regions** Object - available regions


### Method:  `createKey(origin, description, keyUsage)`

#### Arguments

* **origin** String **optional** - Aliyun_KMS (default) or EXTERNAL
* **description** String **optional** - description of key
* **keyUsage** String **optional** -  usage of key, default is ENCRYPT/DECRYPT

#### Returns

* **keyMetadata** Object - metadata of this key


### Method:  `listKeys(pageNumber, pageSize)`

#### Arguments

* **pageNumber** Number **optional** - current page, default 1
* **pageSize** Number **optional** - result count (0 - 100), default 10

#### Returns

* **keyList** Object - list of keys in this endpoint


### Method:  `describeKey(keyId)`

#### Arguments

* **keyId** String **required** - global unique identifier

#### Returns

* **description** Object - description of this key


### Method:  `encrypt(keyId, plaintext, encryptionContext)`

#### Arguments

* **keyId** String **required** - global unique identifier
* **plaintext** String **required** - plaintext to be encrypted (must be Base64 encoded)
* **encryptionContext** String **optional** - key/value string, must be {string: string}

#### Returns

* **ciphertextBlob** Object - encrypted content


### Method:  `decrypt(ciphertextBlob, encryptionContext)`

#### Arguments

* **ciphertextBlob** String **required** - ciphertext to be decrypted
* **encryptionContext** String **optional** - key/value string, must be {string: string}

#### Returns

* **plaintext** Object - decrypted content


### Method:  `disableKey(keyId)`

#### Arguments

* **keyId** String **required** - global unique identifier


### Method:  `enableKey(keyId)`

#### Arguments

* **keyId** String **required** - global unique identifier


### Method:  `generateDataKey(keyId, keySpec, numberOfBytes, encryptionContex)`

#### Arguments

* **keyId** String **required** - global unique identifier
* **keySpec** String **optional** -  AES_256 or AES_128
* **numberOfBytes** Number **optional** -  length of key
* **encryptionContex** String **optional** -  key/value string, must be {string: string}

#### Returns

* **localKey** Object - generated local key


### Method:  `getParametersForImport(keyId, wrappingAlgorithm, wrappingKeySpec)`

#### Arguments

* **keyId** String **required** - global unique identifier
* **wrappingAlgorithm** String **required** - algorithm for encrypting key material, RSAES_PKCS1_V1_5, RSAES_OAEP_SHA_1 or RSAES_OAEP_SHA_256
* **wrappingKeySpec** String **required** - public key type used to encrypt key material, RSA_2048

#### Returns

* **importParams** Object - parameters required to import key material


### Method:  `importKeyMaterial(keyId, encryptedKeyMaterial, importToken, keyMaterialExpireUnix)`

#### Arguments

* **keyId** String **required** - global unique identifier
* **encryptedKeyMaterial** String **required** - key material encrypted with base64
* **importToken** String **required** - obtained by calling GetParametersForImport
* **keyMaterialExpireUnix** String **optional** - key material expiration time


### Method:  `deleteKeyMaterial(keyId)`

#### Arguments

* **keyId** String **required** - global unique identifier


### Method:  `scheduleKeyDeletion(keyId, pendingWindowInDays)`

#### Arguments

* **keyId** String **required** - global unique identifier
* **pendingWindowInDays** Number **required** - key pre-delete cycle, [7, 30]


### Method:  `cancelKeyDeletion(keyId)`

#### Arguments

* **keyId** String **required** - global unique identifier


### Method:  `createAlias(keyId, aliasName)`

#### Arguments

* **keyId** String **required** - global unique identifier
* **aliasName** String **required** - cmk alias, prefix must be 'alias/'


### Method:  `updateAlias(keyId, aliasName)`

#### Arguments

* **keyId** String **required** - global unique identifier
* **aliasName** String **required** - the alias to be operated, prefix must be 'alias/'


### Method:  `listAliases(pageNumber, pageSize)`

#### Arguments

* **pageNumber** Number **optional** - current page, default 1
* **pageSize** Number **optional** - result count (0 - 100), default 10

#### Returns

* **aliasList** Object - list of alias


### Method:  `listAliasesByKeyId(keyId, pageNumber, pageSize)`

#### Arguments

* **keyId** String **required** - global unique identifier
* **pageNumber** Number **optional** - current page, default 1
* **pageSize** Number **optional** - result count (0 - 100), default 10

#### Returns

* **aliasList** Object - list of alias


### Method:  `deleteAlias(aliasName)`

#### Arguments

* **aliasName** String **required** -  alias name, prefix must be 'alias/'

## Test & Coverage

You should set environment variables before running the test or coverage. For example:

* run test

```
ACCESS_KEY=<your access key> SECRET_KEY=<your secret key> npm run test
```

* run code coverage

```
ACCESS_KEY=<your access key> SECRET_KEY=<your secret key> npm run cov
```

## License

[MIT](LICENSE)