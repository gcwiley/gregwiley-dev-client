import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

// import project service
import { ProjectService } from "../../services/project.service";

// import project type
import { Project } from "../../types/project";

// import project type
import { ProjectCategory } from '../../types/project'

// Import Project Status
import { PROJECT_CATAGORIES } from '../../types/project'

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

    public mode = 'create';
    private id!: string | null;
    private project!: Project;

    // import Project Types - Follow Up
    projectCategory: ProjectCategory[] = PROJECT_CATAGORIES

    // create the project form
    projectForm = this.formBuilder.group({
        title: ['', Validators.required],
        status: ['', Validators.required],
        category: ['', Validators.required],
        language: ['', Validators.required],
        startDate: ['', Validators.required],
        liveUrl: [''],
        gitUrl: [''],
        description: ['', Validators.required]
    })

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        public route: ActivatedRoute,
        private projectService: ProjectService
    ) { }

    ngOnInit(): void {
        // find out if we have a "id" or not
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.mode = 'edit';
                this.id = paramMap.get('id')
                this.projectService.getProject(this.id).subscribe((project) => {
                    this.project = project
                    // overrides values of initial form controls
                    this.projectForm.setValue({
                        // set value for every form control
                        title: this.project.title,
                        status: this.project.status,
                        category: this.project.category,
                        language: this.project.language,
                        startDate: this.project.startDate,
                        liveUrl: this.project.liveUrl,
                        gitUrl: this.project.gitUrl,
                        description: this.project.description,
                    })
                })
            } else {
                this.mode = 'create';
                this.id = null;
            }
        })
    }

    onSaveProject() {
        if (this.mode === 'create') {
            this.projectService.addProject(this.projectForm.value).subscribe(() => {
                // navigates user back to homepage
                this.router.navigateByUrl('/')
            })
        } else {
            this.projectService.updateProject(this.id, this.projectForm.value).subscribe(() => {
                // navigates user back to homepage
                this.router.navigateByUrl('/')
            })
        }
    }
}
