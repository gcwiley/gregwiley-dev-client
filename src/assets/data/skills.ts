// define the skill interface
export interface Skill {
   name: string;
   description: string;
}

export class SkillList {
   skills: Skill[] = [
      {
         name: 'Angular',
         description: 'test',
      },
      {
         name: 'Angular',
         description: 'test',
      },
      {
         name: 'Angular',
         description: 'test',
      },
      {
         name: 'Angular',
         description: 'test',
      },
   ];
}
