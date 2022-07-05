import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDTO } from 'src/app/model/userDTO';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, AfterViewInit {
  //Vistas a componentes hijos para el paginador y ordenamiento de la tabla.
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  //Variable que contiene la data de la tabla
  dataSource = new MatTableDataSource<UserDTO>();
  //Form
  formEstudios!: UntypedFormGroup;
  formInsertMode = true;
  formEditMode = false;
  //Items para configurar la tabla
  paginationGroups: number[];
  defaultPagingGroup: number;
  startPagingIndex: number;
  displayedColumns: string[] = [];
  selectedRowIndex = null;
  constructor(
    private userService: UserService,
  ) {
    this.paginationGroups = [5, 10, 15];
    this.defaultPagingGroup = 10;
    this.startPagingIndex = 0;
  }

  ngOnInit(): void {
    this.displayedColumns = ['identification', 'name', 'telephone', 'actions'];
  }

  //Función que se ejecuta luego de iniciar el componente para cargar los registros de Usuarios
  ngAfterViewInit() {
    this.loadUsers();
  }

  /**
   * Lista todos los Usuarios.
   */
  loadUsers() {
    this.userService.getUsersList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res ? res : []);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        //this.dataSource = new MatTableDataSource([]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }
}
