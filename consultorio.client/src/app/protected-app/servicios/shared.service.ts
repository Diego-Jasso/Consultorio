import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  cotizacion: Subject<number> = new Subject<number>;


  cot$: Observable<number> = this.cotizacion.asObservable();

  fetchArmazonesCotizacion(id: number): void {
    this.cotizacion.next(id);
  }
}
