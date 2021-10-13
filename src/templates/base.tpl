<!DOCTYPE html>
<html>
	<head>
		<title>{% block WindowTitle %}Google Cloud Storage FUSE GUI (GCSFSGUI){% endblock %}</title>
		{% if !DisableBootstrap %}
		<link type="text/css" rel="stylesheet" href="./../assets/bootstrap-{% block bootstrap.version %}4.3.1{% endblock %}-dist/css/bootstrap.min.css" />
		{% endif %}
	</head>
	<body>
		{% block content.navbar %}
		<header>
			<!-- Fixed navbar -->
			<nav class="navbar navbar-expand navbar-dark fixed-top bg-dark">
				<a class="navbar-brand" href="#">{%block BrandName %}gcsFUSE{% endblock %}</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarCollapse">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item">
							<a class="nav-link" href="#">Mounts</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Credentials</a>
						</li>
						<!--<li class="nav-item active">
							<a class="nav-link" href="#">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Link</a>
						</li>-->
					</ul>
				</div>
			</nav>
		</header>
		{% endblock %}
		{% if !EnableContainerGap %}
		<div style="height: 20px; text-color: rgba(0,0,0,0);">,</div>
		{% endif %}
		<main class="container" role="main">
			<!-- Title -->
			<h1 class="mt-5">
				{% block content.title %}
				Google Cloud Storage FUSE GUI
				{% endblock %}
			</h1>

			<!-- Subtitle -->
			<p class="lead">
				{% block content.subtitle %}
				gah!~
				{% endblock %}
			</p>

			<!-- Main Content -->
			{% block content.main %}
			<p>
			hewwo?
			</p>
			{% endblock %}
		</main>
		<footer>
			{% block content.footer %}

			{% endblock %}
		</footer>
		<div class="badge container">
			<ul> </ul>
		</div>
	</body>
</html>