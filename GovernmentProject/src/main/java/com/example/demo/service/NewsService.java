package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.News;
import com.example.demo.repositoryint.NewsRepository;

@Service
public class NewsService {

    @Autowired
    private NewsRepository repo;

    public List<News> getAllNews() {
        return repo.findAll();
    }

    public News addNews(News news) {
        // Ensure views always starts from 0
        news.setViews(0);
        return repo.save(news);
    }

    public News updateNews(Long id, News data) {
        News n = repo.findById(id).orElse(null);

        if (n != null) {
            n.setTitle(data.getTitle());
            n.setCategory(data.getCategory());
            n.setDate(data.getDate());

            // ❌ DO NOT update views
            // n.setViews(data.getViews());

            n.setContent(data.getContent());
            n.setFeatured(data.isFeatured());

            return repo.save(n);
        }
        return null;
    }

    // 🔥 AUTO VIEWS INCREMENT
    public News incrementViews(Long id) {
        News news = repo.findById(id).orElse(null);

        if (news != null) {
            news.setViews(news.getViews() + 1); // Increase by 1
            return repo.save(news);
        }
        return null;
    }

    public boolean deleteNews(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
