'use strict'
let relise = 0;
let addWorker = 0;
let remWorker = 0;
let id = 0;




class Director {
  constructor(projects){
    this.projects = projects;
  }

  createDepartment(type){
    return new Departments(type);
  }

  workCompany(day){
    for(let i = 0;i < day;i++){
      if(i != 0 ){
        director.recruit();
      }
        director.addNewProjects = Math.round(Math.random() * 4);

        webDepartment.setWorkerOnProj = director.projects
        mobileDepartment.setWorkerOnProj = director.projects

        webDepartment.work();
        mobileDepartment.work();
        testDepartment.testing();

        webDepartment.deleteProgrammer();
        mobileDepartment.deleteProgrammer();
        testDepartment.deleteProgrammer();
    }
    console.log(`Нанято рабочих ${addWorker}\n Уволено рабочих ${remWorker}\n Реализовано проектов ${relise}`);
  }

  set addNewProjects(value){  
    for(let i = 0; i < value; i++){
      id += i+1;
      const newProject = {
      hard: Math.round(Math.random()*2),
      inWork : false,
      statusDone : 0,
      done : false,
      statusTest : 0,
      type : Math.round(Math.random()),
      worker: [],
      id : id
      };
      this.projects = [...this.projects, newProject];
    }
  }

  recruit(person,project){
    for(let item of director.projects){
      if(!item.inWork && !item.done && item.worker.length === 0 && !person && !project){
        if(item.type === 0){
          const newWebWorker = new Worker(0,true, item.id, 0,0);
          item.worker = [...item.worker, newWebWorker];
          item.inWork = true; 
          webDepartment.workers = [...webDepartment.workers, newWebWorker];
          addWorker += 1;
        }else{
          const newMobileWorker = new Worker(1,true, item.id, 0,0);
          item.worker = [...item.worker, newMobileWorker];
          item.inWork = true; 
          mobileDepartment.workers = [...mobileDepartment.workers, newMobileWorker]; 
          addWorker +=1;
        }
      }else if(!item.inWork && !item.done && item.worker.length === 0 && person && project && item === project){ 
        if (project.type === 0){
          for(let worker of webDepartment.workers){
            if(worker === person){
              person.doProject = project.id;
            }
          }
        }else{
          for(let worker of mobileDepartment.workers){
            if(worker === person){
              person.doProject = project.id;
            }
          } 
        }
        person.working = true;
        item.worker = [...item.worker,person];  
        project.inWork = true;
      }         
    }
  }   
  recruitTester(project,worker){  
    if(!worker){ 
      project.worker = new Worker(2,true, project.id, 0,0);
      testDepartment.workers = [...testDepartment.workers , project.worker];
      addWorker += 1;
    }else{
      worker.doProject = project.id;
      worker.working = true;
      worker.badDay = 0;
      for(let item of director.projects){
        if(item === project){
          worker.working = true;
          item.worker = worker;
        }
      }
    }        
  }
}

class Departments extends Director{
  workers = [];
  constructor(type,projects){
    super(projects);
    this.type = type;
  }

  set setWorkerOnProj(listProject){
    for(let item of listProject){
      if (item.type === this.type === 0 && !item.inWork  && item.worker.length === 0 && !item.done){
        for(let person of this.workers){
          if(!person.working && person.doProject === 0){
              director.recruit(person,item);   
          }
        }
      }else{
        for(let worker of this.workers){
          if(item.hard !== 0 && item.worker.length < 3 && !worker.working && worker.doProject === 0){
            director.recruit(worker,item);
          }
        } 
      }  
    }
  }

  work(){
    for(let item of director.projects){
      if(this.type === item.type && item.inWork && !item.done){
        item.statusDone += 1;
      }

      if(this.type === 1 && this.type === item.type && !item.done ){
        switch(item.worker.length){
          case 2:
            item.hard = 1;
            break;
          case 3:
            item.hard = 0;
            break;
        }
      }

      if(((item.hard === 0 && item.statusDone >= 1) ||
      (item.hard === 1 && item.statusDone >= 2) ||
      (item.hard === 2 && item.statusDone >= 3)) && !item.done){

        for(let worker of this.workers){
          if (item.id === worker.doProject){
            worker.donesProject += 1;
            worker.doProject = 0;
            worker.working = false; 
          }
        }
        item.done = true;
        item.worker = [];
      }
    } 
  }

  testing(){
    for(let item of director.projects){
      if(item.done && item.worker.length === 0 && item.statusTest === 0){ 
        if(this.workers.length === 0){
          director.recruitTester(item);
        }else{
          for(let worker of this.workers){
            if(!worker.working && worker.doProject === 0){
              director.recruitTester(item,worker);
            }
          }
        }
      }
      
      if(item.worker.length !== 0 && item.done){
        item.statusTest += 1;
      } 
      for(let worker of this.workers){
        if(item.statusTest >= 1 && item.id === worker.doProject){
          worker.donesProject += 1;
          worker.doProject = 0;
          worker.working = false;
          for(let project in director.projects){
            if(item === director.projects[project]){
              director.projects.splice(project,1);
            }
          }
          relise +=1;
        }  
      }
    }
  }
  
  deleteProgrammer(){
    let badWorkers = [], min = 0;

    for(let worker of this.workers){
      if(worker.working === false){
        worker.badDay += 1;
      }else{
        worker.badDay = 0;
      }
      if(worker.badDay >= 3 ){
        badWorkers = [...badWorkers, worker]; 
      }
    }
    if(badWorkers.length > 1){
      badWorkers.forEach((item,index,arr) => {
        if(arr[index + 1] && arr[index].donesProject > arr[index + 1].donesProject ){
          min = index + 1;
        }else{
          min = index;
        }
      });
      this.workers = this.workers.filter(item => {
        if (item !== badWorkers[min]){
          return item;
        }else{
          remWorker += 1;
        }
      });
    }else if(badWorkers.length === 1){
      this.workers = this.workers.filter(item => {
        if (item !== badWorkers[0]){
          return item;
        }else{
          remWorker += 1;
        }
      });      
    }
  } 
}

class Worker{
  constructor(type,working,doProject,donesProject,badDay){
      this.type = type;
      this.working = working;
      this.doProject = doProject;
      this.donesProject = donesProject;
      this.badDay = badDay;
  }
}

const director = new Director([]);
const webDepartment = director.createDepartment(0);
const mobileDepartment = director.createDepartment(1)
const testDepartment = director.createDepartment(2);
director.workCompany(100);   // arg - quantity day



