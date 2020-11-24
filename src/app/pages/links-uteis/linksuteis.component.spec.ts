/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LinksuteisComponent } from './linksuteis.component';

describe('LinksuteisComponent', () => {
  let component: LinksuteisComponent;
  let fixture: ComponentFixture<LinksuteisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksuteisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksuteisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
