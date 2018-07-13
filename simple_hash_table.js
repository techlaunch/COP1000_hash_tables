// simple hash table without handeling collitions 

function HashTable(size){
  this._size = size;
  this._storage = [];
  this._count = 0;
}

HashTable.prototype.hash = function(str){
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str[i].charCodeAt();
    hash /= str.length;
  }
  return hash % this._size;
}

HashTable.prototype.set = function (key, value) {
  let hash = this.hash(key);
  this._storage[hash] = value;
  return this._storage;
}

HashTable.prototype.get = function (key) {
  let hash = this.hash(key);
  return this._storage[hash];
}

HashTable.prototype.remove = function (key) {
  let hash = this.hash(key);
  let removed = this._storage[hash];
  this._storage[hash] = undefined;
  return removed;
}

var hashTable = new HashTable(10);

hashTable.set('first name', 'Frank');
hashTable.set('last name', 'Veloz');
hashTable.set('age', '28');
hashTable.set('power', 'coding');

hashTable.get('first name');
hashTable.get('last name');
hashTable.get('age');
hashTable.get('power');


// ================================================================


// hash table with collition handling

function HashTable(size) {
  this._size = size;
  this._storage = [];
  this._count = 0;
}

HashTable.prototype.hash = function (str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str[i].charCodeAt();
    hash /= str.length;
  }

  return Math.floor(hash % this._size);
}

HashTable.prototype.find = function (key) {
  let hash = this.hash(key);
  let bucket = this._storage[hash] || [];
  let match, matchIndex;

  bucket.forEach((item, index) => {
    if (item[key]) {
      match = item;
      matchIndex = index;
    }
  });

  return {
    match: match,
    matchIndex: matchIndex,
    bucket: bucket
  }
}

HashTable.prototype.set = function (key, value) {
  let hash = this.hash(key);
  let match = this.find(key).match;
  let bucket = this.find(key).bucket;

  // if match exits update value
  if(match){
    match[key] = value;
  }
  else {
    // create new item and assign the value
    var newItem = {};
    newItem[key] = value;

    // push to bucket
    bucket.push(newItem);

    // increment the count
    this._count++;

    // insert bucket into storage
    this._storage[hash] = bucket;

  }
  return this;
}

HashTable.prototype.get = function (key) {
  let match = this.find(key).match;
  return match && match[key];
}

HashTable.prototype.remove = function (key) {
  
}

var hashTable = new HashTable(10);

hashTable.set('first name', 'Frank');
hashTable.set('last name', 'Veloz');
hashTable.set('age', 28);
hashTable.set('power', 'coding');
hashTable.set('family members', 89);
hashTable.set('students', 6);
hashTable.set('classes', 22);

hashTable.get('first name');





function HashTable () {
  this.storage = [];
  this.length = 0;
}

HashTable.prototype.set = function (str, val) {
  let hash = this.hash(str);

  let entry = {
    val: val,
    str: str
  };

  if (this.storage[hash]) {
    this.storage[hash].push(entry);
  }
  else {
    this.storage[hash] = [entry];
  }

  this.length++;

  return this.length;
}

HashTable.prototype.get = function (str) {
  let hash = this.hash(str);

  if (this.storage[hash]) {
    return this.storage[hash].find(entry => entry.str === str);
  }

  return this.storage[hash][0];
}

HashTable.prototype.hash = function (str) {
  let hash = 0;

  for (var i = 0; i < str.length; i++) {
    hash += str[i].charCodeAt() / (str.length / 2 + i);
  }
  
  return hash;
}

let hashTable = new HashTable();

hashTable.set('Frank Veloz', { age: 28, gender: 'male' });
hashTable.set('Lola Perez', { age: 30, gender: 'female' });
hashTable.set('Alberto Gonzalez', { age: 35, gender: 'male' });
hashTable.set('Pepito Martinez', { age: 40, gender: 'male' });
hashTable.set('Alex Rodriguez', { age: 38, gender: 'male' });

// console.log(hashTable);

// console.log(hashTable.get('Alex Rodriguez'));