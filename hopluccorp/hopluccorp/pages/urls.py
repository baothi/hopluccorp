from django.urls import path

from .views import (
    AboutPageView,
    AchievementsPageView,
    BusinessFieldDetailView,
    CareersPageView,
    ContactPageView,
    ContactSubmitView,
    HomepageView,
    JobApplicationSubmitView,
    JobDetailView,
    NewsCategoryListView,
    NewsDetailView,
    NewsListView,
    OrganizationPageView,
    PageSEOView,
    ProjectsPageView,
    ResourcesPageView,
)

app_name = "pages"

urlpatterns = [
    path("homepage/", HomepageView.as_view(), name="homepage"),
    path("about/", AboutPageView.as_view(), name="about"),
    path("organization/", OrganizationPageView.as_view(), name="organization"),
    path("resources/", ResourcesPageView.as_view(), name="resources"),
    path("projects/", ProjectsPageView.as_view(), name="projects"),
    path("news/", NewsListView.as_view(), name="news-list"),
    path("news/categories/", NewsCategoryListView.as_view(), name="news-categories"),
    path("news/<str:slug>/", NewsDetailView.as_view(), name="news-detail"),
    path("seo/<str:page_key>/", PageSEOView.as_view(), name="page-seo"),
    path("business-fields/<slug:slug>/", BusinessFieldDetailView.as_view(), name="business-field-detail"),
    path("achievements/", AchievementsPageView.as_view(), name="achievements"),
    path("contact/", ContactPageView.as_view(), name="contact"),
    path("contact/submit/", ContactSubmitView.as_view(), name="contact-submit"),
    # Careers
    path("careers/", CareersPageView.as_view(), name="careers-list"),
    path("careers/apply/", JobApplicationSubmitView.as_view(), name="careers-apply"),
    path("careers/<slug:slug>/", JobDetailView.as_view(), name="careers-detail"),
]
