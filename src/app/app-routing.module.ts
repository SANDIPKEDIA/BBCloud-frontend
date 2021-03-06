import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'finance',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },

  {
    path: 'customers',
    loadChildren: () => import('./pages/customer-management/customer-management.module').then(m => m.CustomerManagementPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },

  {
    path: 'shop',
    loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopPageModule)
  },
  {
    path: 'offer',
    loadChildren: () => import('./pages/offer/offer.module').then(m => m.OfferPageModule)
  },

  {
    path: 'inventry',
    loadChildren: () => import('./pages/inventry/inventry.module').then(m => m.InventryPageModule)
  },

  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./pages/analytics/analytics.module').then(m => m.AnalyticsPageModule)
  },

  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrderPageModule)
  },

  {
    path: 'products',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductPageModule)
  },
  {
    path: 'search/:query',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'reminders/:reminderId',
    loadChildren: () => import('./pages/reminders/reminders.module').then( m => m.RemindersPageModule)
  },
  {
    path: 'notes',
    loadChildren: () => import('./pages/notes/notes.module').then( m => m.NotesPageModule)
  },
  {
    path: 'goals',
    loadChildren: () => import('./pages/goals/goals.module').then( m => m.GoalsPageModule)
  },
  {
    path: 'finance',
    loadChildren: () => import('./pages/finance/finance.module').then( m => m.FinancePageModule)
  },
  {
    path: 'emi',
    loadChildren: () => import('./pages/emi/emi.module').then( m => m.EmiPageModule)
  },
  {
    path: 'docs',
    loadChildren: () => import('./pages/docs/docs.module').then( m => m.DocsPageModule)
  },
  {
    path: 'routine',
    loadChildren: () => import('./pages/routine/routine.module').then( m => m.RoutinePageModule)
  },
  {
    path:'prototype',
    loadChildren: () => import('./pages/prototype/prototype.module').then( m => m.PrototypePageModule)
  },
  {
    path:'customer',
    loadChildren: () => import('./pages/customer/customer.module').then( m =>m.CustomerPageModule)
  },
  {
    path:'employee',
    loadChildren: () => import('./pages/employee/employee.module').then( m =>m.EmployeePageModule)
  },
  {
    path:'task',
    loadChildren: () => import('./pages/task/task.module').then( m =>m.TaskPageModule)
  },
  {
    path:'department',
    loadChildren: () => import('./pages/department/department.module').then( m =>m.DepartmentPageModule)
  },
  {
    path:'feedback',
    loadChildren: () => import('./pages/feedback/feedback.module').then( m =>m.FeedbackPageModule)
  },
  {
    path:'customertouchpoint',
    loadChildren: () => import('./pages/customertouchpoint/customertouchpoint.module').then( m =>m.CustomertouchpointPageModule)
  },
  {
    path:'organisation',
    loadChildren: () => import('./pages/organisation/organisation.module').then( m =>m.OrganisationPageModule)
  },
  {
    path:'order',
    loadChildren: () => import('./pages/order/order.module').then( m =>m.OrderPageModule)
  },
  {
    path:'induction',
    loadChildren: () => import('./pages/induction/induction.module').then( m =>m.InductionPageModule)
  },
  {
    path:'plan',
    loadChildren: () => import('./pages/plan/plan.module').then( m =>m.PlanPageModule)
  },
  {
    path:'marketing',
    loadChildren: () => import('./pages/marketing/marketing.module').then( m =>m.MarketingPageModule)
  },
  {
    path:'git',
    loadChildren: () => import('./pages/git/git.module').then( m =>m.GitPageModule)
  },
  {
    path:'project',
    loadChildren: () => import('./pages/project/project.module').then( m =>m.ProjectPageModule)
  },

  {
    path:'vacancy',
    loadChildren: () => import('./pages/vacancy/vacancy.module').then( m =>m.VacancyPageModule)
  },
  {
    path:'training',
    loadChildren: () => import('./pages/training/training.module').then( m =>m.TrainingPageModule)
  },
  {
    path:'package',
    loadChildren: () => import('./pages/package/package.module').then( m =>m.PackagePageModule)
  },
  {
    path:'knowledgecenter',
    loadChildren: () => import('./pages/knowledge/knowledge.module').then( m =>m.KnowledgeCenterPageModule)
  },
  {
    path:'feature',
    loadChildren: () => import('./pages/feature/feature.module').then( m =>m.FeaturePageModule)
  },
  {
    path:'ticket',
    loadChildren: () => import('./pages/ticket/ticket.module').then( m =>m.TicketPageModule)
  },
  {
    path:'work',
    loadChildren: () => import('./pages/work/work.module').then( m =>m.WorkPageModule)
  },
  {
    path:'todo',
    loadChildren: () => import('./pages/todo/todo.module').then( m =>m.TodoPageModule)
  },
  {
    path:'meeting',
    loadChildren: () => import('./pages/meeting/meeting.module').then( m =>m.MeetingPageModule)
  },

  {
    path: 'notemgnt',
    loadChildren: () => import('./pages/note-management/note-management.module').then(m => m.NoteManagementPageModule)
  },
  {
    path: 'docmgnt',
    loadChildren: () => import('./pages/training-management /training-management.module').then(m => m.TrainingManagementPageModule)
  },
  {
    path:'user',
    loadChildren: () => import('./pages/user/user.module').then( m =>m.UserPageModule)
  },









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
