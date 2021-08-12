import {Component, OnInit} from '@angular/core';
import {ICircle} from "../interfaces/circle.interface";
import {ECircleCount} from "../enums/circle-count.enum";
import {StorageService} from "../services/storage.service";
import {IProject} from "../interfaces/project.interface";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  circles: ICircle[] = [];
  projectName: string = '';
  projectList: IProject[] = [];
  isActive: boolean = false;
  currentProject!: IProject;
  projectListName = 'circlesProject';
  canvasSizes: number[] = [
    ECircleCount.MIN, // 100
    ECircleCount.MID, // 225
    ECircleCount.MAX, // 400
  ];
  selectedSize: number = this.canvasSizes[0];
  currentColor: string = '#000';

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.getProjects();
    console.log(this.projectList)
  }

  onGenerateCircles(): void {
    this.resetColors()
    console.log('this.circles: ', this.circles);
  }

  onSizeSelect(): void {
    this.circles = [];
  }

  onCircleClick(circle: ICircle): void {
    if(this.circles[circle.id].color === this.currentColor ){
      this.circles[circle.id].color = "";
    }else {
      this.circles[circle.id].color = this.currentColor;
    }
  }

  onResetColor(): void {
    if (!this.isEmpty(this.circles)) {
      this.resetColors();
    }
  }

  resetColors(): void {
    this.circles = [];
    for (let i = 0; i < this.selectedSize; i++) {
      this.circles.push({
        id: i,
        uid: this.newId(),
        color: '',
      });
    }
  }

  onFillCircles(): void {
    if (this.isEmpty(this.circles)) {
      return;
    }
    this.circles.forEach((item) => {
      item.color = this.currentColor;
    })
  }

  isEmpty(arr: ICircle[]): boolean {
    return !arr.length;
  }

  newId(): string {
    return String(Date.now());
  }

  onSave(): void {
    if (this.isEmpty(this.circles) || !this.projectName) {
      return;
    }
    this.projectList.push({
      id: this.newId(),
      name: this.projectName,
      circles: this.circles,
    })
    const projectsStr = JSON.stringify(this.projectList);
    let users = this.storage.retrieve('users');
    let currentUser = this.storage.retrieve('isLoggined');
    users[currentUser.name][this.projectListName] = projectsStr;
    this.storage.store('users', users);
  }

  getProjects(): void {
    let users = this.storage.retrieve('users');
    let currentUser = this.storage.retrieve('isLoggined');
    const projects = users[currentUser.name][this.projectListName];
    if (projects) {
      this.projectList = JSON.parse(projects);
    }
  }

  selectProject(project: IProject): void {
    this.currentProject = project;
    this.projectList.forEach(item => {
      if (item.id !== project.id) {
        item.isActive = false;
      } else {
        item.isActive = true;
      }
    });
    console.log(this.projectList);
    this.circles = project.circles;
  }

  deleteProject(): void {
    this.projectList = this.projectList.filter((item) => {
      if (this.currentProject.id !== item.id) {
        this.projectList.push(item);
      }
    })
    
  }
}
