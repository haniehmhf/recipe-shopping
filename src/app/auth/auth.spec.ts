import { HttpClient, HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service"
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { of, throwError } from "rxjs";
describe('Service Auth', () => {
    let service: AuthService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    const form = {
        email: "hanieh.mahboobifar20@gmail.com",
        password: 123456
    }

    const expectedUSer = {
        displayName: "",
        email: "hanieh.mahboobifar20@gmail.com",
        expiresIn: "3600",
        idToken: "123",
        kind: "identitytoolkit#VerifyPasswordResponse",
        localId: "PeoP99Xl93a2ffhCkPgo2ec84bi2",
        refreshToken: "123",
        registered: true
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ]
        })

        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
        const router = jasmine.createSpyObj('Router', ['navigate'])
        service = new AuthService(httpClientSpy, router);
    })

    it('Auth Service Test', () => {
        expect(service).toBeDefined()
    })

    it('should return expected user (HttpClient called once)', function (done: DoneFn) {
        httpClientSpy.post.and.returnValue(of(expectedUSer));
        service.login(form).subscribe(res => {
            expect(res).toEqual(expectedUSer);
            done();
        },
            err => done.fail);

        expect(httpClientSpy.post.calls.count())
            .toBe(1);
    })
})