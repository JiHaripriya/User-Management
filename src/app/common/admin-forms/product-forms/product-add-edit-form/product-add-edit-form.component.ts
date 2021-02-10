import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FormServiceService } from 'src/app/shared/services/admin/form-service.service';

@Component({
  selector: 'app-product-add-edit-form',
  templateUrl: './product-add-edit-form.component.html',
  styleUrls: ['./product-add-edit-form.component.css'],
})
export class ProductAddEditFormComponent implements OnInit {
  @ViewChild('content') productForm: ElementRef;
  addProductForm: FormGroup;
  addProductSubscription: Subscription;
  editProductSubscription: Subscription;
  formTitle = '';
  isPending = false;
  index: number;
  selectedFile: File;

  image;

  constructor(
    private modalService: NgbModal,
    private formService: FormServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.addProductSubscription = this.formService.openProjectAddForm.subscribe(
      (status) => {
        if (status) {
          this.onAdd(this.productForm);
        }
      }
    );

    this.editProductSubscription = this.formService.openProjectEditForm.subscribe(
      (status) => {
        if (status) {
          this.onEdit(this.productForm);
        }
      }
    );

    this.addProductForm = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern('[1-9]+'),
      ]),
      image: new FormControl(null, [Validators.required]),
    });
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  onFileChanged(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result as string;
      };
    }
  }

  private onAdd(content) {
    this.formTitle = 'Add';
    this.addProductForm.reset();
    this.modalService.open(content);
  }

  private onEdit(content) {
    this.formTitle = 'Edit';
    this.modalService.open(content);
  }

  private capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  onSubmit() {}

  ngOnDestroy() {
    this.addProductSubscription.unsubscribe();
    this.editProductSubscription.unsubscribe();
  }
}
