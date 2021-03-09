class Item {
  constructor(id, taskName, isCompleted){
    this.id = id;
    this.taskName = taskName;
    this.isCompleted = isCompleted;
  }

  setStatus(status){
    this.isCompleted = status;
  }

  getStatus(){
    return this.isCompleted;
  }

  setName(newName){
    this.taskName = newName;
  }
}

class todoList {
  constructor(){
    this.doneItems = [];
    this.undoneItems = [];
    this.currentId = 0;
  }

  getCurrentId(){
    return this.currentId;
  }

  addItem(taskName, id = this.currentId, isCompleted=false){
    if (isCompleted){
      this.doneItems.push(new Item(id, taskName, isCompleted));
    } else {
      this.undoneItems.push(new Item(id, taskName, isCompleted));
    }  
    this.currentId++;
  }

  findItemsById(id, arr){
    let indx = -1;
    arr.forEach((itm, i) => {
      if (itm.id === id){
        indx = i;
      }
    });
    if(indx < 0){
      return -1;
    }
    return indx;
  }
  deleteItem(id){
    let indx = this.findItemsById(id, this.doneItems);
    if(indx >= 0){
      this.doneItems.splice(indx, 1);
      return true;
    }
    indx = this.findItemsById(id, this.undoneItems);
    if(indx >= 0){
      this.undoneItems.splice(indx, 1);
      return true;
    }
    return false;   
  }

  markAsDone(id){
    const indx = this.findItemsById(id, this.undoneItems);
    if(indx < 0){
      return false;
    }
    const itm = this.undoneItems[indx];
    this.undoneItems.splice(indx, 1);
    itm.setStatus(true);
    this.doneItems.push(itm);
    return true;
  }
  unmarkAsDone(id){
    const indx = this.findItemsById(id, this.doneItems);
    if(indx < 0){
      return false;
    }
    const itm = this.doneItems[indx];
    this.doneItems.splice(indx, 1);
    itm.setStatus(false);
    this.undoneItems.push(itm);
    return true;
  }

  reclassify(id, newStatus){
    if (newStatus){
      this.markAsDone(id);
    }
    else{
      this.unmarkAsDone(id);
    }
  }
  getItemById(id){
    let indx = this.findItemsById(id, this.doneItems);
    if(indx >= 0){
      return this.doneItems[indx];
    }
    indx = this.findItemsById(id, this.undoneItems);
    if(indx >= 0){
      return this.undoneItems[indx];
    }
    return false;  
  }

  list(){
    return this.doneItems.concat(this.undoneItems)
  }
}

// const myToDo = new todoList();
// myToDo.addItem('a');
// myToDo.addItem('b');
// myToDo.addItem('c');
// myToDo.addItem('d');