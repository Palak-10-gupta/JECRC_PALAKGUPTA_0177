import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn:'root' })
export class CartService{

items = signal<any[]>([]);

add(p:any){
const exist = this.items().find(x=>x.id===p.id);
if(exist) exist.qty++;
else this.items.set([...this.items(), {...p, qty:1}]);
}

inc(p:any){ p.qty++; this.items.set([...this.items()]); }

dec(p:any){
if(p.qty>1){
p.qty--;
this.items.set([...this.items()]);
}
}

remove(id:number){
this.items.set(this.items().filter(x=>x.id!==id));
}

clear(){ this.items.set([]); }

total = computed(()=>{
return this.items().reduce((s,x)=> s + x.price*x.qty ,0);
})

}