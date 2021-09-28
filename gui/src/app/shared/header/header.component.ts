import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {BudgetComponent} from "../../budget/budget.component";
import {ModalService} from "../modal.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  budgetModal = BudgetComponent;

  constructor(public authService: AuthService, private router: Router, public modalService: ModalService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.authService.logout();
  }
}
