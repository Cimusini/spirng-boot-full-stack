import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomerRegistrationRequest} from "../../models/customer-registration-request";

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent {

  @Input()
  customer: CustomerRegistrationRequest = {};

  @Output()
  submit: EventEmitter<CustomerRegistrationRequest> =
    new EventEmitter<CustomerRegistrationRequest>();

  get isCustomerValid(): boolean {
    return this.hasLenght(this.customer.name) &&
      this.hasLenght(this.customer.email) &&
      this.hasLenght(this.customer.password) &&
      this.hasLenght(this.customer.gender) &&
      this.customer.age !== undefined && this.customer.age > 0;
  }

  private hasLenght(input: string | undefined): boolean {
    return input !== null &&
      input !== undefined &&
      input.length > 0;
  }

  onSubmit() {
    this.submit.emit(this.customer);
  }
}
