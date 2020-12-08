/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnidadeService } from './unidade.service';

describe('Service: Unidade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnidadeService]
    });
  });

  it('should ...', inject([UnidadeService], (service: UnidadeService) => {
    expect(service).toBeTruthy();
  }));
});
