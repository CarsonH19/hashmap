import './style.css';

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
        return
      }
    }
    // Add new entry if key doesn't exist
    bucket.push({ key, value} );
    this.size++;

    // Check load factor & resize if needed
    if (this.size / this.capacity >= this.loadFactor) {
      this.resize(this.capacity * 2);
    }
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