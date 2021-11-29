export enum AppRoute {
  Root = '/',
  NotFound = '/not-found',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id'
}

export const CreateAppRoute = {
  [AppRoute.Film]: (id: number): string => AppRoute.Film.replace(':id', String(id)),
  [AppRoute.AddReview]: (id: number): string => AppRoute.AddReview.replace(':id', String(id)),
  [AppRoute.Player]: (id: number): string => AppRoute.Player.replace(':id', String(id)),
};
