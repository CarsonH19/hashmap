import "./style.css";

class HashMap {
  constructor(initialCapacity = 10, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.size = 0;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i > key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      // modulo operator on each iteration to prevent large numbers
      hashCode %= this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      const entry = bucket[i];
      if (entry.key === key) {
        entry.value = value; // Update value if key exists
        return;
      }
    }
    // Add new entry if key doesn't exist
    bucket.push({ key, value });
    this.size++;

    // Check load factor & resize if needed
    if (this.size / this.capacity >= this.loadFactor) {
      this.resize(this.capacity * 2);
    }
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];
    for (const entry of bucket) {
      if (entry.key === key) {
        return entry.value;
      }
    }
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];
    for (const entry of bucket) {
      if (entry.key === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  length() {
    let mapSize = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      for (let j = 0; j < bucket.length; j++) {
        mapSize++;
      }
    }
    return mapSize;
  }

  clear() {
    this.capacity = 10;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  keys() {
    let keyArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      for (let j = 0; j < bucket.length; j++) {
        keyArray.push(bucket[j].key);
      }
    }
    return keyArray;
  }

  values() {
    let valueArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      for (let j = 0; j < bucket.length; j++) {
        valueArray.push(bucket[j].value);
      }
    }
    return valueArray;
  }

  entries() {
    let entriesArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      for (let j = 0; j < bucket.length; j++) {
        entriesArray.push(bucket[j]);
      }
    }
    return entriesArray;
  }

  resize(newCapacity) {
    const oldBuckets = this.buckets;
    this.capacity = newCapacity;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);

    for (const bucket of oldBuckets) {
      if (bucket) {
        for (const entry of bucket) {
          this.set(entry.key, entry.value);
        }
      }
    }
  }
}


const map = new HashMap();
map.set("Carson", 29);
map.set("Joohee", 30);
map.set("Scott", 40);
map.set("Mammaw", 72);
map.set("Gran", 67);

console.log(`Get: ${map.get("Carson")}`);
console.log(`Has: ${map.has("Jacob")}`);
console.log(`Remove: ${map.remove("Scott")}`);
console.log(`Has: ${map.has("Scott")}`);
console.log(`Length: ${map.length()}`);
console.log(`Keys: ${map.keys()}`);
console.log(`Values: ${map.values()}`);
console.log(`Entries: ${map.entries()}`);
console.log(`Clear: ${map.clear()}`);
console.log(`Length: ${map.length()}`);