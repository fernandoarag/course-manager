import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  course: Course = {
    id: 0, name: '', imageUrl: '', price: 0, code: '', duration: 0, rating: 0, releaseDate: '', description: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    const getId: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    const getIdNumber: number = typeof (getId) === 'string' ? +getId : 0;

    this.courseService.retrieveById(getIdNumber).subscribe({
      next: course => this.course = course,
      error: err => console.log('Error: ', err),
      complete: () => console.info('Dados do curso carregados!')
    });
  }

  save(): void {
    this.courseService.save(this.course);
  }

}
