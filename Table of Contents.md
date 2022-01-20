---
layout: page
title: 'Table of Contents'
permalink: /toc/
---

<!-- {% for tag in site.tags %}
<h3>{{ tag[0] }}</h3>
<ul>
  {% for post in tag[1] %}
  <li><a href="{{site.baseurl}}/{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
{% endfor %} -->


<div class="accordion accordion-flush" id="accordionFlushExample">
{% for tag in site.tags %}
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#{{ tag[0] }}" aria-expanded="false" aria-controls="flush-collapseOne">
       {{ tag[0] }}
      </button>
    </h2>
    <div id="{{ tag[0] }}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <ul class="list-group list-group-flush">
        {% for post in tag[1] %}
            <li class="list-group-item"> <a class="blankLink" href="{{{ site.url }}{{ site.baseurl }}{{post.url}}"> {{ post.title }} </a></li>
        {% endfor %}
        </ul>
      </div>
    </div>
  </div>
  {% endfor %}
</div>
