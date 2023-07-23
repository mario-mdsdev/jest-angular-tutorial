import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataComponent } from './data.component';
import { FakeService } from '../services/fake.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let fakeServiceMock: any;

  beforeEach(() => {
    fakeServiceMock = {
      getDataV1: jest.fn()
    };
    TestBed.configureTestingModule({
      declarations: [DataComponent],
      providers: [{
        provide: FakeService, useValue: fakeServiceMock
      }]
    });
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getServiceData set serviceData', () => {
    const expectedResponse = { name: 'Mário dos Santos' };
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expectedResponse));
    fixture.detectChanges();
    expect(component.serviceData).toEqual(expectedResponse);
  });

  it('should getServiceData set errorMessage', () => {
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(throwError(() => errorResponse));
    fixture.detectChanges(); // It could be component.getServiceData();
    expect(component.errorMessage).toBe('Not Found');
  });

  it('should set greeting for "Good morning!"', () => {
    const expectedResponse = { name: 'Mário dos Santos', time: 9 };
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expectedResponse));
    fixture.detectChanges();
    expect(component.greeting).toBe('Good morning!');
  });

  it('should set greeting for "Good day!"', () => {
    const expectedResponse = { name: 'Mário dos Santos', time: 18 };
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expectedResponse));
    fixture.detectChanges();
    expect(component.greeting).toBe('Good day!');
  });

  it('should set greeting for "Good evening!"', () => {
    const expectedResponse = { name: 'Mário dos Santos', time: 22 };
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expectedResponse));
    fixture.detectChanges();
    expect(component.greeting).toBe('Good evening!');
  });

});
