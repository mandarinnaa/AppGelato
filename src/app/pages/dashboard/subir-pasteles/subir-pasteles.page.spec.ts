import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubirPastelesPage } from './subir-pasteles.page';

describe('SubirPastelesPage', () => {
  let component: SubirPastelesPage;
  let fixture: ComponentFixture<SubirPastelesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirPastelesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
