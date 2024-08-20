class HashMap {
  constructor(initialSize = 16, loadFactor = 0.75) {
    this.size = 0;
    this.loadFactor = loadFactor;
    this.buckets = new Array(initialSize).fill(null).map(() => []);
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    const bucketLength = this.buckets.length;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucketLength;
    }

    return hashCode;
  }
  getBucket(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    return this.buckets[index];
  }
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.getBucket(index);

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey] = bucket[i];
      if (existingKey === key) {
        bucket[i] = [key, value];
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.buckets.length > this.loadFactor) {
      this.resize();
    }
  }
  get(key) {
    const index = this.hash(key);
    const bucket = this.getBucket(index);

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, value] = bucket[i];
      if (existingKey === key) {
        return value;
      }
    }
    return null;
  }
  has(key) {
    return this.get(key) !== null;
  }
  remove(key) {
    const index = this.hash(key);
    const bucket = this.getBucket(index);

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey] = bucket[i];
      if (existingKey === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }
  resize() {
    const newBuckets = new Array(this.buckets.length * 2)
      .fill(null)
      .map(() => []);
    const oldBuckets = this.buckets;

    for (let i = 0; i < oldBuckets.length; i++) {
      for (let j = 0; j < oldBuckets[i].length; j++) {
        const [key, value] = oldBuckets[i][j];
        this.set(key, value);
      }
    }
  }
  length() {
    return this.size;
  }
  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
    this.size = 0;
  }
  keys() {
    const keysArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        const [key] = this.buckets[i][j];
        keysArray.push(key);
      }
    }
    return keysArray;
  }
  values() {
    const valuesArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        const [, value] = this.buckets[i][j];
        valuesArray.push(value);
      }
    }
    return valuesArray;
  }
  entries() {
    let entriesArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        entriesArray.push(this.buckets[i][j]);
      }
    }
    return entriesArray;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// Overwrite a few nodes
test.set("apple", "green");
test.set("banana", "brown");

// Add one more to trigger resizing
test.set("moon", "silver");

// Test other methods
console.log(test.get("apple")); // green
console.log(test.has("carrot")); // true
console.log(test.remove("elephant")); // true
console.log(test.length()); // 11
console.log(test.keys()); // Array of all keys
console.log(test.values()); // Array of all values
console.log(test.entries()); // Array of all key-value pairs
