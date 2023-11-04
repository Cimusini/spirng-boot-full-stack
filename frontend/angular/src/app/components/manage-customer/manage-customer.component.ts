import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerRegistrationRequest} from "../../models/customer-registration-request";

@Component({
  selector: ' app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent{

  @Input()
  customer: CustomerRegistrationRequest = {};

  @Input()
  operation: 'create' | 'update' = 'create';

  @Output()
  submit: EventEmitter<CustomerRegistrationRequest> =
    new EventEmitter<CustomerRegistrationRequest>();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>();

  get isCustomerValid(): boolean {
    return this.hasLenght(this.customer.name) &&
      this.hasLenght(this.customer.email) &&
      this.customer.age !== undefined && this.customer.age > 0 &&
      (
        this.operation === 'update' ||
        this.hasLenght(this.customer.password) &&
        this.hasLenght(this.customer.gender)
      )
      ;
  }

  private hasLenght(input: string | undefined): boolean {
    return input !== null &&
      input !== undefined &&
      input.length > 0;
  }

  onSubmit() {
    this.submit.emit(this.customer);
  }

  onCancel() {
    this.cancel.emit();
  }
}
