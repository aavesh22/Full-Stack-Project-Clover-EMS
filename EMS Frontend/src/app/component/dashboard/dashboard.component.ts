import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewRequirementService } from '../../shared/new-requirement.service';
import { ReplacementService } from '../../shared/replacement.service';
import { EmployeeService } from '../../shared/employee.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  benchCount: number = 0;
  newRequirementCount: number = 0;
  replacementCount: number = 0;

  constructor(
    private router: Router,
    private newRequirementService: NewRequirementService,
    private employeeService: EmployeeService,
    private replacementService: ReplacementService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.benchCount = employees.length;
      this.employeeService.updateBenchCount(this.benchCount);
      this.animateCount('benchCount', this.benchCount);
    });

    this.newRequirementService.getNewRequirements().subscribe(requirements => {
      this.newRequirementCount = requirements.length;
      this.newRequirementService.updateNewRequirementCount(this.newRequirementCount);
      this.animateCount('newRequirementCount', this.newRequirementCount);
    });

    this.replacementService.getReplacements().subscribe(replacements => {
      this.replacementCount = replacements.length;
      this.replacementService.updateReplacementCount(this.replacementCount);
      this.animateCount('replacementCount', this.replacementCount);
    });
  }

  animateCount(elementId: string, endValue: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const countUp = new CountUp(elementId, endValue);
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    }
  }

  navigateTo(path: string) {
    this.router.navigate([`dashboard/${path}`]);
  }
}
