import { of, throwError } from 'rxjs';
import { FakeService } from './fake.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('FakeService', () => {
  let service: FakeService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn()
    }
    service = new FakeService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getDataV1', () => {
    const response: string = 'It works!';
    const url: string = 'https://jsonplaceholder.typicode.com/todos/1';
    // Como o ´método get´ retorna um Observable, precisamos usar o método ´of´ para tornar o retorno um Observable.
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
    service.getDataV1();
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toBeCalledWith(url);
  });

  it('should test getDataV2', (done) => {
    const response: string = 'It works!';
    const url: string = 'https://jsonplaceholder.typicode.com/todos/1';
    // Como o ´método get´ retorna um Observable, precisamos usar o método ´of´ para tornar o retorno um Observable.
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
    service.getDataV2().subscribe({
      next: (data: any) => {
        expect(data).toEqual(response);
        done();
      },
      error: (error: any) => console.log(error)
    });
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should getDataV2 throw error', (done) => {
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });
    const url: string = 'https://jsonplaceholder.typicode.com/todos/1';
    // Como o ´método get´ retorna um Observable, precisamos usar o método ´of´ para tornar o retorno um Observable.
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(throwError(() => errorResponse));
    service.getDataV2().subscribe({
      next: (data: any) => console.log(data),
      error: (error: any) => {
        expect(error.message).toContain('test 404 error');
        done();
      }
    });
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should test postDataV1', () => {
    const payload: string = 'This is the payload body!';
    const expectedResponse: string = 'It works again!';
    const url: string = 'https://jsonplaceholder.typicode.com/todos/1';
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(expectedResponse));
    service.postDataV1(payload);
    expect(httpClientSpy.post).toBeCalledTimes(1);
  });

});
