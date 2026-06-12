import React, { useState } from 'react';

const TOURS_STATIC = [
  {
    id: "1",
    title: "Альпійська казка",
    location: "Швейцарія",
    price: 1200,
    duration: "7 днів",
    rating: "4.9",
    imageUrl: "https://cdn.pixabay.com/photo/2020/03/03/20/31/boat-4899802_1280.jpg",
    category: "Гори"
  },
  {
    id: "2",
    title: "Золоті пляжі Балі",
    location: "Індонезія",
    price: 1500,
    duration: "10 днів",
    rating: "4.8",
    imageUrl: "https://media.istockphoto.com/id/475519262/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D1%83%D1%80%D0%B0-%D1%83%D0%BB%D1%83%D0%BD-%D0%B4%D0%B0%D0%BD%D1%83-%D0%B1%D1%80%D0%B0%D1%82%D0%B0%D0%BD-%D0%B2-%D0%B1%D0%B0%D0%BB%D0%B8-%D0%B8%D0%BD%D0%B4%D0%BE%D0%BD%D0%B5%D0%B7%D0%B8%D1%8F.jpg?s=612x612&w=0&k=20&c=ZMIaRt5BCadx94F2_GMYyRaGy207wGNi0IZNVxxLgmI=",
    category: "Пляж"
  },
  {
    id: "3",
    title: "Таємниці Риму",
    location: "Італія",
    price: 850,
    duration: "5 днів",
    rating: "4.7",
    imageUrl: "https://aws-tiqets-cdn.imgix.net/images/content/ae55c13761824ba5b6f3126bc1d7a561.jpg?auto=format,compress&fit=crop&h=260&q=40&w=390",
    category: "Місто"
  },
  {
    id: "4",
    title: "Магія Ісландії",
    location: "Ісландія",
    price: 2100,
    duration: "8 днів",
    rating: "5.0",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Idyllic_landscape_with_a_waterfall_(Unsplash).jpg/1280px-Idyllic_landscape_with_a_waterfall_(Unsplash).jpg",
    category: "Природа"
  },
  {
    id: "5",
    title: "Сафарі в Кенії",
    location: "Кенія",
    price: 1800,
    duration: "6 днів",
    rating: "4.9",
    imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExIWFRUXGBUXFhcVFhgVFRUVFhUYFhUXFRUYHSggGBolHRcXITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OFxAQFy0dHx0tLS0rLS0rLy0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAABAgUGB//EADwQAAEDAgMFBgQGAQMEAwAAAAEAAhEDIQQSMUFRYXGRBRMigaHwBrHB4RQyQlLR8WIVgsIHI3KSQ6Ky/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAJBEBAQACAwACAgIDAQAAAAAAAAECEQMSIRMxQVFhcQQikRT/2gAMAwEAAhEDEQA/APbgq8yCHqFy4no6GzKsyDnUzoPQ4ettelg9aDkHo0HKwUsHrYepVoaVYQsyrMkeh86ttaEtnUzKdnIafVlYS4etd4ltXUYqASg50RtZTarqt7YVZVDVV94FO1TFptIohw3HksMqlFDiUtpu4gqEWcJRA2LxIWCwrU2RtF/hthbOkFbc4DilnSsGqQjY6bNF43Qtd407Eg+u5BNRyNq+I/UO5LVGu4pU4p22UWnizxQqY2L7vbCJDTqhOquKyCeB5p7PQ5pAaFJVq3uVVeoTsSrgf2rTFNg34jgtnFpJ07kMzuWkkZ3bod+P3KLn5CrT1CG7xWKiW7xTMq0g1nUDwlQ9XmQo3nCneJXOrzJaOGhUWg9KBy0HKdKhvvFfeJXOrzpK0Z7xTOls6rOpsVIazK8yWzqd4pXIaBWgClBVRG1yoq5DIaVeRCFcrTcQVFPrTVKknqVAfuXPp44phmPO5EsYcmPJTT2f5BAzxtBWXYk7glquK4ItThx5Xw5307EMwkDilbcQjbScNh0tHFTuxsQG1+KKKgQVljDsPxHRZdh3cEy2uBsB5qvxI/aOpTLtn+gBRdwWhSKJ+Ib+2OSw+qP3Ecwg95X8M5YVOcNyw5/+fp91nvD+/wBAmrTRpjchvpcFs1htcEN9Rn7vUqpsaByHcotTT3/NRVsuscEPViogZleZdunFsxnV50vmUzpdVbM94rFRLZlYcp6qlNB6vOlc6vOl1VKazqZ0tnVhym4qlMZ1Yelw5aDlNjSD51MyFmVgqbGkFDkRhS4KKxZ5NcYaaVqEOimGLJd8apBNMhYaQQgirCTC7yM1GoLqMrbK8qZtyCm4Qq09iA4EJ+u4FJVKicdE9iU6iaFRc4lW2uq6p8PGosOqpbv1h1VOYFbB3VjvQnVjvSz6qGai2x42OWZo1uKGax3pU1Fk1FpMGNzMmqsmtxSpeslyuYM7ma79RJ51FXRPdM6mdeTxPxgzKcjXB2zNGXzgrlu+MK50ydD/ACturl+WPoOdTOvDYX40eB/3KYdxaY+afofGNM603A8xHVLqc5cXqw5aD154fFFHLmvHCDfdzWMP8W0HTOZkCRMGeAhLqv5cf29LmVyvnWP+Ja5cctZoA0axvpJ1hc9vbGIBzd+c2wSTPloEdE/+iR9WzK8y+QHG1SS41HyduYgFNYXtzEUdKtrWccwKV41T/Jn6fVg5WHLx3Z/xkJHe5ACLlmYkHlC9BhO2aFQwyq0ndMH1Wdwrpw5cb9V1AUVr0rmV5lncXRjkfpPG0JhoGyFy2vW21Fllg6McnVa+Ni0aoXMbWO9bD1lcWkkroMridvVYe/WNEqHIgrmI1CjSvj19NsqIzqxBhIuKG4pyHcIafikrUqylMRjabPzVGti93AacFyH/ABbgwY74HiGuI6wtsOO38MOTkxx8tkd01FjvFwh8W4Q//L1a6PkmaPbuGeQG1mEnQTcracdn4c95cb9ZT/rpGoqL1guWS5XMWeWTZcskoZesF6uYsrkIXLJehFyySqmLO5CF6wXrBKolVIi5N5lEOVSek9nzh/ZdQRBY5xP5QczgbRIiEjUc69pO2L9Y0RqbKjQCwvBvOWRGy50TeExtdr2tOUOGZ2aqNMxkucTqOe9aOIHBYGpUDiA3wiTmMGOHUIOIwz2GCRt0MxCY7zEhggnIS4CCBNi50DcIPRLVKAAaQHji8QDygoNg1enqsU6t/FMbYMGOa1UAOxYczagjjq1HKcrDr4ZfJHOAlTVM2gchbXYhaldHCdnio10ktMw1/wCidztolIw8ScwDnvJdpsgRvAugNDdTfdB6SnsHgqoDiKBfq27CRA2y3V1l08H8MVqpYBQdREGXOa8ucbatjwoP7cJlLMRlynWxMbJvMLLHlpzDw7R9l7Zn/T8Gcz6g/wBkXOkzKUxPwi6gwkgucZYGwHa2DmnYN4ItNikvrROyPjSGhtZpcRbOIuOI3r2NDENe0Oa4OB0IMr5tR+FMS67aflmHXVdTsDsbEB8hrqbmOBdJORzdojftUXCOjj5sp5fXuZWg5JdpdoU6Il7o2wNTyXEf8Y0xoxx3bPYWVwtdc58cfuvVtKK1yQwGLFVgeAQD+4EH1TbSscsHZx8sNMK7eG+HKz2h3hbIkBxM+gsvLf65Rpn84JmIAzX3WXqG/wDUPDiA4PBi4OXw87rG42X3G3+i/wAjn5JJ8Wr+yGJwLmEtcII1SVdwaCToNwJ9Ap2v8W0qtSQToIG0hcqt2ywhwkyNkXM7Anhx5X8NceedN52beH7afTq1XuyU6ZJlst/7hA2uE+hC5r6lEiC2o9+gMNaANBDYk7NEz8RUqfeOdDs54wQZ/iFxqragvJ5zt5rvxmo8Tlz/ANq6uKwdJzIo06jnZQ5xboDtJbe33Sv+lkwWwzQ5nPiJ0m0Damew+0KsluaAQS6TJAaLw3j9V28fgs8ZC6q6xcC1uQRoAYsOCuM/L65XZvapwtTx1DVB1ylxjrYr2mB7Tp1hNN0+hXExXYBqUxFBlOIPhg1D9AmOxvhtlPxnMXg/+JHAgWKNSqxyyx8/DuEoOJr5WkxJ3DUpgsXm+1OyHVHuca+Rv6jAaOWY6omJ5ZsYrteoYa5ppT+ppDidwE7UGhjnUgDUfVfP+TI6WMLz3adGmxwbSqmprLiCGjTQ7Us1jyYaS4mwAuTttvVac9zr31LtuiRJdl2eK1+eiTxnxNRYYDs//jp1Xg8VReDcOEGNDruQ8rgLgjmgd69wfjGj+13p/Ki8HllRMdq+rUcHROGhhyu0tGYiNJ2XXl+0+xaQpOexzhUmQ1xnO0iTfl0I4r0QrCIHDZuXF7fxDoMCco3bHa/Tor8ZbrldjVg1j2NpmpUcDcgFrG5g6JdoJF96Wr1XOcTUd/ta2zd+UHRO9gVgJaSW5gbxZB7Rwrmm5Lhs4+Sk/SIotc4AVI1kuEDhpO71WS5rTYzps27ddiy7fGiG5mawB0SDp4KtTMSxtjNxZ3B22OS9ZT7SbDWvoUxScQJZ4xawDiYi+krxGEoHMNbHd816nvZw1Ruhg6TG9M91xstMVKpNRzQHkNaDfLDtvMAKM7bqsIyV64EgQKkHnZI06Elzi6NI43II6pbFYiHAWkeehlEm026d+t8XY+i45MTUc20B1RzjEXs4kb9i9X2d2z2k+j3n4m+TMGPoNJd4ZAY4N8R2L5XXqFxLiSSdq9v8I9uPezunPl7BawvTEAdNOiq8ehjnt6jC9p9ouYHOrYYXIk08x8JLTJLNZBSGI7SxebIa9G8GW0g22aCfyTxSHf1wHta6wdU0GmZ5f/yXIaytUqDNUMlrtdfC5ot5n0Uai911O2MPmePxNZr5bYspQ4TpEcty5OEo0G1sre8qAxlBBBO+QFGVKzajs4c50a7RxHBFdTdmBLskAmZvuj5peK7PU4PtdlNuQNvNmz/IlM9odoTRcRLDBsRcjmF4p1AkzmJMSJEHlb6LnYvtCq6A5xgbLqbMWk5s/p28TiKTQ297WAjLxPFc3E4huaWhzhreY13XXOc5x2E+SI1jto6zdGh8leu7IrUxTBrPa1jtBFyZ1M26JrtfFUHUgW1GgzY/tIaQASLrydekSyQwiN35eiBSJyluU6zojrDvNlrRfHOOYuLpnaeatrLAjbpGybAk81qpg3uNmnghHCVLjKRGojin4y26DcK+jVpkm7tdvG+/UdF9Bo9p0cmRkOgXa2LW2r5zUoYgEWJy6beG1dHsvBPDs5tIMg6yn4JlY91RxrGstPAGOkrNHtMFpLm5Tu1leae4gSTZKVsc7LLT5GQU/B3yeoxmKLh4KuTgWXPmT9Elie3WupPhpDm2gxB4mRB5cV46rj6z7FpI5XWQKjvCWn5aI3E9qK7t6HOzNa8HYWgN6Qmj2tTNNha0Co1wcAPCJH6hB1IsfJcip2c/Yw81j8A/9pnzRsnv8N3FRrHPZmAAIbI/Mbl7v8pm2xcj4jrUC5tINygAvcTEmTAaNgnUncOK42AZVpDNBAMjTM7yGwcUljmV3OJe0y4CQNw0mNE9wejY78Pnd3YdktEi+gnbvlRIHDVT+l6iWxp9EyCUKvhGuEETMemiNCjgs9q0Vp4BjdGjcrOCYf0hMuCoBGxoo3sunP5R0Wh2ZTBnKJ3plxQ8QTB5H5IDldrYplENjJJkkOGweYuksR8QhgMik8Q0+Cb5rxcm4TGMw/eVS1sQIF5ItawBGpzHyKRxeBDHEEMdBjTgDN53+iuYVPyY9bNe/s9XwFR/5XNaXAATTM+Nx36X81wO0uwX0czn1GGLGJmSSN3Aro0cF4XOa0ANiYOW52CG8uqXrszCHZyN3eOcOhcAtZ9eRl/dIt7Equa57QC1sBxkwJ0myDSwVQEtkTuGcyJ/xaZCfGHaJANQTrDiJ5+IrvfDQyPbYPF/zmdk7WqZc9+tM/j1Okv8/wB/w5/Y+ELpBbVO0GkK42AREN27V0sL2Q99QFgxYhryTlqOjxNG86wbCZXt6NSsHZBSY0gA3fAgki2Vp0j1CPSq1nAHwNBcGXc4kEwBaBtICNxOq+cYqqab8n4mqHnQPYyRrqHsBGm3fzXX7OByAueKhN8wjTdLRBXoe28VWpuyPw9PENAJcIcHAEWLTDo/Vu01XgsZ8URVYylTytkS0+JwkxkERpv5LPL1ePj0mqCabf2hEc5Ye8KFtMpt2D0UyjcgfigAtfiRCNGMGjcqc0bku/GgarAx4KNFs2ArSTccDCKzEAoGxxqoUHOFk1wmDDmhZgapM4u5CxVxJhBOgAFTqrRqQuS3EO1uksVSL3XnyKA7rsdTBiVTMaw7brzv+nAXkjffX7olKhsD/d/smHoxWbvCsVmrzpLmwJ3o4c6LH37CNFt3c7eCi4gc5RI3oO8UdUXJq4+N9tUJ/aF+FvlKA7Daqt1YLk08aDpyRi4xfyQDRxAmFh+LEO2kNcQOIFp8yOqUrU7GL7Vyq+IcXQ22a3OfFfp6Jwqfw1QspucNSRG+xgeufqk6lUuJJudfRc1jagILg4CCSR+k3ib30B5LLsW6ZEa8rHduW0rG411aB8L72nTi0ZZ9PVYjRLMxQySdS4yOJOv/ANkt/qD5OgI3hV3kLpa62Uap/sZ0PaeP8rk4auXAksMxMDTyXU7MFgdljxuPRTcpTmNj2Te0A59NwOrHf8CPqqpdpgNqa+GpnuLWqbP/AEnzC4rsJmDZqkRplBB65kejh2Q4Go90iHWEmx3gqfFvQNx+bEzsdTy/+pn3zXzj41wnc4o1KbYEsqtAFp/LUAjkCvQdpMeW+EOEEXJAnzAAC4hOIBp1IIfTcTTcDm1bdsE6GHc54qbozDsYIDhcGCDwP9oVTEidfZQsHQfUp5y3Nlcc5bcAkk+Q9ETEYaQCNdvL3PRQvaMO33xWqr9223qhU2ESDvHQqqjfFY6X9fv6IAb65EgjSPfojYSqDMezqoadtPEff0VOp6kCJB2RNj9/RAYe4SREbks2sWkzbTrtTFIki9rBViMOHCDv+SYSriSDu5+9y07E24kW8oKy7Cm/KemqujhvDAO/XXegib8STeSFH4w6O03o1TAOmy0MBOpCCCdiSBIuDHNUHtdsTVHAMF8ytzWNnaj6BenTdz4/Qpylht43+/RB7+IgdPfBMMrWPBGz0gofM/NHp0xOiA2tax3e/kmc95B1SMQBqtKuqjerQC72j5fwlMS8Z9Llsxyvoo8mAQRqbcr/ACv5cUIUy4yIkRM7LaX92Cokpa2aTtEadU/QeTa/D11S9DDtcLSCBIGwxxmd+u0pukzQbRcHz0j3tQQrhtvedPt7ssYTCtdmzSItI/MDcWtvgo7mDQcx5jRaoNILr6wY8rolGi1Wi5tVwcA1vhBqGCXAus1w5kj+15vtTD5Huj8oNuTYXsq1ckHbmg+IyJGkcrFcaphJcZHOdusjlBVXKJkcfu3eKRPhJ4mIlR2GNgSZdIkmRoCOW7yXefQDmjYb6boI+q3h8OAGt3E8dNPOLKNqc3BUHAAG0iAf8gZAXaa31HK83t0WHkCLaGRzH9rRxI1E/NGwNhsY42aSYsYtFuAvsRO7qHLOc6zMmLceKGzGGDB98eizUrkgAk79fmjY0I2jU0PhB4jXWdd6P/p5LXEVWC9jmOy+gG5c6m6evqLq6uJLWndcddU9jQmFhhfFVoa8+KATmOkwW/VQ1NxmwuAGzbcNFyzXEcN3yQ6ePAdGz7Kdh1XQ4nyQ3tvPP5e+qHQqzPL6rZOh2fYIUlNwEW+y007Pe4pZxN938z780RouPP1SDRJmYhFZUG0JYuMuG6PNRx2+9qAutUM2UbmOh3LL3fz5lEw8THJAZaCfM+S1UcRPC/mrw7dnQ+ZRXUx1lAZyZuWo87aoGJZ4SOnPYE61uk7Prqo6lsjaUBz24Yw0n+bjetinb3eAun3Qg+9yGaN59+9Uw5mHJzRznmAivYctvRMPpQSQOPXX+UehHVIEhTJvA6qk94VaYefNK55i/A26rWGqOFTS8md3mnn0RpHu0fJZfSvKe0t0rERpOiKKolBGg6eaTdUgm+2OsQimfFYTEogrSJHBclrjczb3K1Sqm/veEjdF9f0Vtq2lcuvihfyt5SVKFe/D6oDoVXbjulTZxv1v780sa1idsGOYVDF33+5SBwCw8/Uf2lchtv23262R+8lvI+cBAe4kxtIn5/wmVGYdHDTjvBRXOvOzQ9ffVKYd8iNLi3vijAzy3b7n+EAdhiOHz4rGIILTOmnv3sWHtJHkJjZZZpsJzNI3dI2IMs9lievC0fVICl4js05bV26eHvGoMjzVfhhlPM9d6REsGCMwGkHzv902Py+dvfkt0qcTxn36KzYkbPfvzTAFF5mD79lFey8i2b6f0oBeY3R5x9QiVWw5oHH5pUwKzpM7yPSfsqLtOFvfRFqNk8NPlP0WKbLbZDhyg2KQDJ8XT5H6ouFeENtKw+u4Sh0gQNdDHX+EwcNQNcOPTULRr8P6nVArU82U6QQffU9FXdEG/GOiQOGtcDeP5VvrDUc+sH+Uq12h1g+mqyTcf7R6hMOiypYqu9nyP1S7Xe+ACEx9yNPuUEPWqcdOmv2VMqZb7Nf5QM8kn2IVg/q02W27QeSAdDlEKmyRMlRIy7alvKPfvaguqRbbErRcEZtp81aQO8m+76LLWmTpGvP3ZTubHZ91eUtPMTzgIMOtRgAAARPrw6pZzSNhk8OduP8ASczzMncs67bR/H8IDnFsmIkyD5afJHdAE6RskxAMDXmtuqEGAd3SyxiG6TzOwpASs7xDdIt8x6oFZpuJnLJ4Tt9FRGZs6kbeU+/JHYcodbUa62JH8IMxgvy7/paSFrJ+ofpJHlofp1QMJiPEbRppabHYulQIJP8AlJ87SkAMPRuRwMcRY/RGpNA5TfhcreEEFo2adNEUtBLhzProgi9akGg32+/JSm6YPD7wjOaC08R9ECnTIgbIHy2IMzTMgcD6gwsFuvGUSk3XmCqYzxHl9EAtpHGT6hYjxG/vT3zTGJgdB/8AoIDLuPGeoI0QGNo2Xj6prFag29/0guboeI+crb3SC2b/AEP9oAFM6dD019UVps7ZE/dCpuDmcflB/kFHGhjclQy4Xjj/AMShmnGUnaUVzvD69AoHiBz/ALQNNtHp8vfzQ8U4Ni0yY8plQAwd3yiyFibiNd3P3dAZmLTr6Rs6BR5Gk+fv3ZK3mNSDfp9vVMPadd2h8roIam7aY98kCqSSdms35/wFlpGyZIn6qU2SJ8vPcmF0XAXJkXPpHzhHNUObbl9en8penRMW3zytoPOOqNhWHxA6G/lF/r6IAhrRb5qlTRa8dVaAQZU8UHX2URtYgkbom+slRRUS6VWTl4x6/ZFpV/CJGkjykFRROwMVmQcvERy1QGNO3yUUUmHWpnN99kK6r8xjcPsookF0iSOAt6pmqQ1rYAnThGgUUQZZoF3C1xI3WRqNeXRofCR56hRRIGWVYcDO0z6Jqq67t9iOrVFEwvvbQBsJHAgIIreJo5fdRRKg5SPvgtsPiHQ+qpRAI1jcDgfQg/JBD/ESNhHqP6UUQDGIjysR5hBa7xA8BPUD5K1EwlS3yPVWz9Xn9CqUSBNtYlo4FxPIGCFbapBDdxIHItVqIBtj9fI851WzeI1UURAWDYJ32TDhYDZdRRMiTx4iPcD+1KTvX2PUKKIAora8fpqFMO69vYlRRI2e+4egUUUTD//Z",
    category: "Сафарі"
  }
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Усі');

  const categories = ['Усі', 'Гори', 'Пляж', 'Місто', 'Природа', 'Сафарі'];

  const filteredTours = TOURS_STATIC.filter((tour: any) => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Усі' || tour.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: '#171717', color: 'white', minHeight: '100vh', fontFamily: 'Geist, sans-serif' }}>
      {/* Навбар */}
      <nav style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        <a href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#f97316', textDecoration: 'none' }}>TourBureau</a>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Головна</a>
          <a href="#about" style={{ color: 'white', textDecoration: 'none' }}>Про нас</a>
        </div>
      </nav>
      
      {/* Твоя крутая заставка с фургончиком */}
      <section style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url("https://tripmydream.cc/travelhub/blog/blog/15/46/block_1546.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: '0', backgroundColor: 'rgba(0,0,0,0.4)' }} />
        <div style={{ position: 'relative', zIndex: '10', textAlign: 'center', maxWidth: '800px', margin: 'auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Відкрий світ разом з <span style={{ color: '#f97316', fontStyle: 'italic' }}>TourBureau</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#eee', marginBottom: '30px', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            Ми створюємо незабутні спогади, поєднуючи комфорт та справжні пригоди.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '15px', display: 'flex', gap: '10px', border: '1px solid rgba(255,255,255,0.2)', backdropBlur: '5px' }}>
            <input 
              type="text" 
              placeholder="Куди ви хочете поїхати?" 
              style={{ flex: '1', background: 'transparent', border: 'none', outline: 'none', color: 'white', padding: '10px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button style={{ background: '#f97316', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Знайти пригоду</button>
          </div>
        </div>
      </section>

      {/* Каталог */}
      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '32px', margin: '0 0 10px 0', color: '#f97316' }}>Наші популярні напрямки</h2>
            <p style={{ color: '#aaa', margin: '0' }}>Обирайте тур, який відповідає вашому настрою та бюджету.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', background: activeCategory === cat ? '#f97316' : 'transparent', color: 'white', fontSize: '12px', fontWeight: 'bold' }}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {filteredTours.map((tour: any) => (
            <a key={tour.id} href={`/tour/${tour.id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <div style={{ background: '#262626', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', height: '100%' }}>
                <div style={{ position: 'relative', height: '200px', borderRadius: '15px', overflow: 'hidden', marginBottom: '15px' }}>
                  <img src={tour.imageUrl} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '8px', fontSize: '10px' }}>{tour.category}</span>
                  <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: '#171717', color: '#f97316', padding: '6px 12px', borderRadius: '10px', fontWeight: 'bold' }}>${tour.price}</span>
                </div>
                <span style={{ color: '#f97316', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>{tour.location}</span>
                <h3 style={{ fontSize: '20px', margin: '5px 0 10px 0', color: 'white' }}>{tour.title}</h3>
                <p style={{ margin: '0', fontSize: '12px', color: '#aaa' }}>{tour.duration} | {tour.rating} ★</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
