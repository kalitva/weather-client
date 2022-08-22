import { Component, OnInit } from '@angular/core';
import { ErrorInfo } from 'src/app/model/error-info.model';
import { ErrorState } from 'src/app/state/error-state';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent implements OnInit {
  showError: boolean;
  errorInfo: ErrorInfo;

  constructor(private errorState: ErrorState) {
  }

  ngOnInit(): void {
    this.errorState.onError(this.reportError);
  }

  private reportError = (errorInfo: ErrorInfo): void => {
    this.showError = true;
    this.errorInfo = errorInfo;
    setTimeout(() => this.showError = false, 10_000);
  };
}
