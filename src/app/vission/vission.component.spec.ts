import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VissionComponent } from './vission.component';

describe('VissionComponent', () => {
  let component: VissionComponent;
  let fixture: ComponentFixture<VissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
