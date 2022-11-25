import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../../services/book.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  form: any;
  result$: Observable<any> = new Observable<any>();
  record: any[] = [];

  constructor(private service: BookService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.manageHistory();
    this.buildingForm();
  }

  buildingForm() {
    this.form = new FormGroup({
      search: new FormControl()
    });
    
    this.route.queryParams.subscribe(vals => {
      if (vals['search'])
        this.form.get('search').setValue(this.route.snapshot.queryParams['search'])
    })

    if (!this.form.get('search').value)
      this.router.navigateByUrl('');

    this.form.get('search').valueChanges.subscribe((val: string) => {
      if (!val) this.router.navigateByUrl('');
    })

  }

  search() {
    const param: string = this.form.get('search').value;
    this.manageHistory(param);
    this.router.navigate(['/books'], {queryParams: {search: param}})
  }

  manageHistory(value: string = "") {
    const local: string = localStorage.getItem('record') + "";
    this.record = JSON.parse(local);
    if (!this.record) this.record = [];
    if (value) {
      this.record.unshift(value);
      this.record = this.record.slice(0, 3)
      localStorage.setItem('record', JSON.stringify(this.record))
    }
  }

  redirectTo(param: string) {
    this.router.navigate(['/books'], {queryParams: {search: param}})
  }
}
