/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LinksUteisEditComponent } from './links-uteisEdit.component';

describe('LinksUteisEditComponent', () => {
  let component: LinksUteisEditComponent;
  let fixture: ComponentFixture<LinksUteisEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksUteisEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksUteisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
