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
from videos;

select *, (select count(rate) from "comments-rate" where "videoId" = comments."videoId" and rate = true)
from comments
