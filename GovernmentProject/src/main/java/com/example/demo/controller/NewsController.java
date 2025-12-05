package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.News;
import com.example.demo.service.NewsService;

@RestController
@RequestMapping("/api/news")
@CrossOrigin("*")
public class NewsController {

    @Autowired
    private NewsService service;

    @GetMapping
    public List<News> getAll() {
        return service.getAllNews();
    }

    @PostMapping
    public News add(@RequestBody News news) {
        return service.addNews(news);
    }

    @PutMapping("/{id}")
    public News update(@PathVariable Long id, @RequestBody News news) {
        return service.updateNews(id, news);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        return service.deleteNews(id) ? "Deleted" : "Not Found";
    }

    // ⭐ NEW ENDPOINT – AUTO INCREASE VIEWS ⭐
    @PutMapping("/view/{id}")
    public News increaseViews(@PathVariable Long id) {
        return service.incrementViews(id);
    }
}
