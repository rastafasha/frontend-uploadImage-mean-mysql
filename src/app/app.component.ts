import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'uploadFiles';

  image='';
  imgUl= 'assets/noimages.jpeg';
  event:any;
  images:any = [];

  constructor(
    private http: HttpClient
  ){

  }

  ngOnInit():void{
  this.mostrarImg();
  }

  selectImage(event:any){

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event:any) => {
        this.imgUl = event.target.result;
      }

      this.image = file;

    }

  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.image);
    this.http.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => (Swal.fire({
                icon:'success',
                title: 'Imagen Cargada',
                text: 'La imagen se subio correctamente',

              }).then((result)=>{
                  if(result){
                    location.reload();
                  }
                })
      ),
      (err)=>Swal.fire({
        icon:'error',
        title: 'Oops..',
        text: 'Parece que no subio nada'
      })
    );

  }

  mostrarImg(){
    this.http.get<any>('http://localhost:3000/upload').subscribe(
      res => {
        this.images = res;
        const reader = new FileReader();
        reader.onload = this.images;
        console.log(this.images);
      }
    );
  }

  deleteImg (id:any){

    Swal.fire({
      icon: 'info',
      title: 'Desea eliminar la imagen?',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
    }).then((result) => {
      this.http.delete<any>(`http://localhost:3000/delete/${id}`).subscribe( res => {

            location.reload()

        });
    });

  }

}
