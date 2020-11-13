class _Node {
    constructor(value, next){
      this.value = value;
      this.next = next; 
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    insertFirst(value) {
      this.head = new _Node(value, this.head);
      

    }
  
    insertLast(value) {
      let currentNode = this.head;
      if (currentNode == null) {
        this.insertFirst(value);
        console.log("INSERT LAST WORKING",this.head, this.next)
        return;
      }
  
      while (currentNode.next != null) {
        currentNode = currentNode.next;
      }
      currentNode.next = new _Node(value, null);
    }


    insertAt(i, item) {
      if (this.head === null) {
          console.log('List is empty')
          return
      }

      if (i === 0) {
          this.insertFirst(item)
          return
      }

      const currNode = this._findnthElement(i - 1)

      if (!currNode) {
          console.log('Index out of bounds')
          return
      }

      const newNode = new _Node(item, null)
      newNode.next = currNode.next
      currNode.next = newNode
  }
  
  _findnthElement(pos) {
    let node = this.head

    try {
    for ( let i = 0; i < pos; i++) {
        node = node.next
    }
    } catch(e) {
        return null
    }
    return node
}
      
    
    moveHeadBy(level) {  //what is level??
      let head = this.head;
      this.head = this.head.next;
      this.insertAt(level, head.value)
     }
  
    
     listNodes() {
      let node = this.head;
      const arr = [];
      while(node) {
        arr.push(node);
        node = node.next;
      }
      return arr;
    }

    
    listLength() {
      let node = this.head;
      const arr = [];
      while(node) {
        arr.push(node);
        node = node.next;
      }
      return arr.length;
     } 
    // find(value) {
    //   let currentNode = this.head;
    //   if (currentNode == null) {
    //     console.error(`The list is empty!`);
    //   }
  
    //   while (currentNode.next != null) {
    //     if (currentNode.value === value) {
    //       return currentNode;
    //     }
    //     currentNode = currentNode.next;
    //   }
    //   console.error(`Node with ${value} does not exist!`);
    // }
  }
  
  module.exports = { LinkedList }; 
