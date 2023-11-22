select "videoId"
from "video-genre"
where "video-genre"."genreId" in (1, 2)
GROUP BY "videoId"
HAVING COUNT(DISTINCT "genreId") = 2;

select *
from videos;

select *
from videos
WHERE EXISTS (SELECT 1
              FROM unnest(name) AS elem
              WHERE elem iLIKE 'в%');


select *, (Select avg(rate) from "video-rate" where "videoId" = videos.id)
from videos
where EXISTS (SELECT 1
              FROM unnest("videos"."name") AS elem
              WHERE elem ILIKE '%%')
  and "videos"."videoCategoryId" = 2;

select *, (select count(rate) from "comments-rate" where "videoId" = comments."videoId" and rate = true)
from comments;

select *
from "video-series"
where "dateRelease" between '2023-01-01' and '2023-01-08'
  and "dayShowId" = 1;