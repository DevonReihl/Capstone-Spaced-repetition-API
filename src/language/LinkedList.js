class _Node {
    constructor(value, next) {
      this.value = value;
      this.next = next;
    }
  }
  
  class LinkedList { 
    constructor() {
      this.head = null;
      this.size = 0;
    } 
  
    insertFirst(item) {
      this.head = new _Node(item, this.head);
      this.size++;
    }
  
    insertLast(item) {
      if (this.head === null) {
        this.insertFirst(item);
      }
      else {
        let tempNode = this.head;
        while (tempNode.next !== null) {
          tempNode = tempNode.next;
        }
        tempNode.next = new _Node(item, null);
        this.size++;
      }
    }
  
    insertBefore(value, key) {
      if (this.head === null) {
        this.insertFirst(value);
      }
      else {
        let prevNode = this.head;
        let newNode = this.head;
        while (newNode.value !== key) {
          prevNode = newNode;
          newNode = newNode.next;
        }
        prevNode.next = new _Node(value, newNode);
        this.size++;
      }
    }
  
    insertAfter(value, key) {
      if (this.head === null) {
        this.insertFirst(value);
      }
      else {
        let newNode = this.head;
        let nextNode = newNode.next;
        while (newNode.value !== key) {
          newNode = newNode.next;
          nextNode = newNode.next;
        }
        newNode.next = new _Node(value, nextNode)
        this.size++;
      }
    }
  
    insertAt(value, index) {
      if (this.head === null) {
        this.insertFirst(value);
        return
      }
  
      // if (index === 0) {
      //   this.head = new _Node (value, this.head);
      //   return
      // }
  
      else {
        let prevNode = this.head;
        let newNode = this.head;
        while ((newNode !== null) && index -1 > 0) {
          prevNode = newNode;
          newNode = newNode.next;
          index--;
        }
        prevNode.next = new _Node(value, newNode);
        this.size++;
      }
    }
  
    find(item) {
      //Start at the head
      let currNode = this.head;
      //If the list is empty
      if (!this.head) {
        return null;
      }
      //Check for the item
      while (currNode.value !== item) {
        /* Return null if it's the end of the list
        and the item is not on the list */
        if (currNode.next === null) {
          return null;
        }
        else {
          // Otherwise, keep looking
          currNode = currNode.next;
        }
      }
      //Found it 
      return currNode;
    }  
  
    remove(item) {
      //If the list is empty
      if (!this.head) {
        return null;
      }
  
      //If the node to be removed is head, make the next node head
      if (this.head.value === item) {
        this.head = this.head.next;
        this.size--;
        return;
      }
  
      //Start at the head
      let currNode = this.head;
      //Keep track of previous
      let previousNode = this.head;
  
      while ((currNode !== null) && (currNode.value !== item)) {
        //Save the previous node
        previousNode = currNode;
        currNode = currNode.next;
      }
  
      if (currNode === null) {
        console.log('Item not found');
        return;
      }
      this.size--;
      previousNode.next = currNode.next;
      
    }
    
    
   
  } 