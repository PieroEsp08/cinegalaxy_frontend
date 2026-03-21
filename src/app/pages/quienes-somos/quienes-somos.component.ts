import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './quienes-somos.component.html',
  styleUrl: './quienes-somos.component.css'
})
export class QuienesSomosComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initStatsAnimation();
  }

  initStatsAnimation(): void {
    const stats = document.querySelectorAll('.stat-num');
    let animated = false;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        stats.forEach(el => {
          const target = parseInt((el as HTMLElement).dataset['target'] || '0');
          const duration = 1500;
          const start = performance.now();

          const update = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(ease * target);
            el.textContent = this.formatNum(current, target);
            if (progress < 1) requestAnimationFrame(update);
          };

          requestAnimationFrame(update);
        });
      }
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) observer.observe(statsSection);
  }

  formatNum(n: number, target: number): string {
    if (target >= 1000000) return Math.round(n / 1000000) + 'M+';
    if (target >= 40) return n + '+';
    return n.toString();
  }
}