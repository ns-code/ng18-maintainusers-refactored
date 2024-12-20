import { fakeAsync, TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { StateMgmtService } from './service/state-mgmt.service';
import { Router, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersService } from './service/users.service';
import { interval, take } from 'rxjs';
import { UsersResolver } from './service/resolvers/users.resolver';
import { StateMgmtMockService } from './service/state-mgmt-mock.service';

export const waitUntil = async (untilTruthy: Function): Promise<boolean> => {
  while (!untilTruthy()) {
    await interval(25).pipe(take(1)).toPromise();
  }
  return Promise.resolve(true);
};

describe('Test List Users', () => {
  // let service: StateMgmtService;
  let router: Router;
  let appDataStateService: StateMgmtService;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsersComponent, RouterModule.forRoot([
        {
          path: 'users', component: UsersComponent, resolve: {
            product: UsersResolver
          }
        },
      ])],
      providers: [provideHttpClient(), provideHttpClientTesting(),
      { provide: StateMgmtService, useClass: StateMgmtMockService },
      { provide: UsersResolver, useClass: UsersResolver },
      ],
    });
    TestBed.inject(UsersResolver);
    usersService = TestBed.inject(UsersService);
    appDataStateService = TestBed.inject(StateMgmtService);
    router = TestBed.inject(Router);
  });

  it('should list all users in DB', fakeAsync (() => {
    const usersComponent = TestBed.createComponent(UsersComponent);
    const usersComponentInstance = usersComponent.componentInstance;

    // Given: n users in DB
    const dbUsersCount = appDataStateService.users().length;

    // When: loadusers called on the component
    usersComponentInstance.loadUsers();

    // Then the component has n users
    expect(usersComponentInstance.users()).toHaveSize(dbUsersCount);
  }));

  it('should delete selected users in DB', fakeAsync(async () => {
    const usersComponent = TestBed.createComponent(UsersComponent);
    const usersComponentInstance = usersComponent.componentInstance;

    // Given: m users in DB
    let dbUsersCountBeforeDel = appDataStateService.users().length;
    console.log(">>> dbUsersCountBeforeDel: ", dbUsersCountBeforeDel);

    // When n users selected for deletion
    usersComponentInstance.ngOnInit();
    usersComponentInstance.toDeleteIds.add(2n);
    usersComponentInstance.toDeleteIds.add(3n);
    const selCount = usersComponentInstance.toDeleteIds.size;        
    usersComponentInstance.deleteSelectedIds();

    // Then: the users list length should be m-n
    appDataStateService.loadUsers();
    expect(usersComponentInstance.users().length).toEqual(dbUsersCountBeforeDel - selCount);
  }));
});
