import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TagListComponent } from '../tag-list/tag-list.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @Input() container: TagListComponent;
  @Input() tag: Tag;

  modalConfig = new NgbModalConfig();
  showActions = false;
  tagForm: FormGroup;

  constructor(
    private tagService: TagService,
    public modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.tagForm = new FormGroup({
      id: new FormControl(this.tag.id),
      articleId: new FormControl(this.tag.articleId),
      title: new FormControl(this.tag.title),
      description: new FormControl(this.tag.description),
      createDate: new FormControl(this.tag.updateDate),
      updateDate: new FormControl(this.tag.updateDate),
    });
  }

  openAcitonsModal(modal: TemplateRef<any>) {
    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'md';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.modalConfig.centered = false;
    this.modalService.open(modal, this.modalConfig);
  }

  onUpdate(modal: TemplateRef<any>) {

    this.modalService.dismissAll();
    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'md';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.modalService.open(modal, this.modalConfig);
  }

  onDelete(modal: TemplateRef<any>) {

    this.modalService.dismissAll();
    this.modalConfig.ariaLabelledBy = 'modal-basic-title';
    this.modalConfig.size = 'md';
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.modalService.open(modal, this.modalConfig);
  }


  update() {
    if (this.tagForm.valid) {
      console.log('tag', this.tag);
      console.log('tagForm', this.tagForm.value);

      const model = new Tag();
      Object.assign(model, this.tagForm.value);
      console.log('model', model);

      this.tagService.update(model).subscribe(result => {
        this.tag = result;
        this.modalService.dismissAll();
        // this.container.refreshList();
      });
    }
    else {
      alert('forms is in valid');
    }
  }

  delete() {
    this.tagService.delete(this.tag.id).subscribe(result => {
      this.modalService.dismissAll();
      this.container.refreshList();

    });
  }
}
